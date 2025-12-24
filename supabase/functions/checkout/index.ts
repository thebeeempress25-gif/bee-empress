import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface CheckoutRequest {
  sessionId: string;
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
    notes?: string;
  };
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  paymentMethod?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const checkoutData: CheckoutRequest = await req.json();
    const { sessionId, customerInfo, shippingAddress, paymentMethod } = checkoutData;

    // Get cart items for this session
    const { data: cartItems, error: cartError } = await supabase
      .from('cart_items')
      .select(`
        id,
        product_id,
        quantity,
        gift_wrap,
        products (
          id,
          name,
          price,
          offer_price,
          stock_quantity,
          track_inventory
        )
      `)
      .eq('session_id', sessionId);

    if (cartError || !cartItems || cartItems.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Cart is empty or not found' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Check inventory for products that track it
    for (const item of cartItems) {
      const product = item.products as any;
      if (product.track_inventory && product.stock_quantity !== null) {
        if (product.stock_quantity < item.quantity) {
          return new Response(
            JSON.stringify({
              error: `Insufficient stock for ${product.name}. Available: ${product.stock_quantity}`,
            }),
            {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }
      }
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = cartItems.map((item: any) => {
      const product = item.products;
      const price = product.offer_price || product.price;
      const itemSubtotal = price * item.quantity;
      subtotal += itemSubtotal;

      return {
        product_id: product.id,
        product_name: product.name,
        product_price: price,
        quantity: item.quantity,
        gift_wrap: item.gift_wrap,
        subtotal: itemSubtotal,
      };
    });

    // Simple tax calculation (8% - adjust as needed)
    const tax = subtotal * 0.08;
    
    // Simple shipping calculation
    const shippingCost = subtotal >= 50 ? 0 : 5.99;
    
    const total = subtotal + tax + shippingCost;

    // Generate order number using database function
    const { data: orderNumberResult } = await supabase
      .rpc('generate_order_number');

    const orderNumber = orderNumberResult || `ORD-${Date.now()}`;

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          order_number: orderNumber,
          session_id: sessionId,
          customer_email: customerInfo.email,
          customer_name: customerInfo.name,
          customer_phone: customerInfo.phone || null,
          subtotal: subtotal,
          tax: tax,
          shipping_cost: shippingCost,
          total: total,
          status: 'pending',
          payment_status: 'pending',
          payment_method: paymentMethod || 'cash_on_delivery',
          notes: customerInfo.notes || '',
        },
      ])
      .select()
      .single();

    if (orderError || !order) {
      console.error('Order creation error:', orderError);
      return new Response(
        JSON.stringify({ error: 'Failed to create order' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create order items
    const orderItemsWithOrderId = orderItems.map((item: any) => ({
      ...item,
      order_id: order.id,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsWithOrderId);

    if (itemsError) {
      console.error('Order items error:', itemsError);
      // Rollback order if items fail
      await supabase.from('orders').delete().eq('id', order.id);
      return new Response(
        JSON.stringify({ error: 'Failed to create order items' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create shipping address
    const { error: addressError } = await supabase
      .from('shipping_addresses')
      .insert([
        {
          order_id: order.id,
          full_name: shippingAddress.fullName,
          address_line1: shippingAddress.addressLine1,
          address_line2: shippingAddress.addressLine2 || '',
          city: shippingAddress.city,
          state: shippingAddress.state,
          postal_code: shippingAddress.postalCode,
          country: shippingAddress.country,
          phone: shippingAddress.phone || null,
        },
      ]);

    if (addressError) {
      console.error('Shipping address error:', addressError);
    }

    // Update inventory for products that track it
    for (const item of cartItems) {
      const product = item.products as any;
      if (product.track_inventory && product.stock_quantity !== null) {
        await supabase
          .from('products')
          .update({ stock_quantity: product.stock_quantity - item.quantity })
          .eq('id', product.id);
      }
    }

    // Clear cart
    await supabase.from('cart_items').delete().eq('session_id', sessionId);

    // Return success with order details
    return new Response(
      JSON.stringify({
        success: true,
        order: {
          id: order.id,
          orderNumber: order.order_number,
          total: order.total,
          status: order.status,
          createdAt: order.created_at,
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});