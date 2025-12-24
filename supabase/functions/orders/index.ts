import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

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

    const url = new URL(req.url);
    const path = url.pathname.replace('/orders', '');

    // GET /orders?sessionId=xxx or GET /orders?email=xxx or GET /orders/:orderNumber
    if (req.method === 'GET') {
      const sessionId = url.searchParams.get('sessionId');
      const email = url.searchParams.get('email');
      const orderNumber = path.replace('/', '');

      // Get specific order by order number
      if (orderNumber) {
        const { data: order, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              id,
              product_id,
              product_name,
              product_price,
              quantity,
              gift_wrap,
              subtotal
            ),
            shipping_addresses (*),
            order_status_history (
              id,
              status,
              notes,
              created_at
            )
          `)
          .eq('order_number', orderNumber)
          .single();

        if (error || !order) {
          return new Response(
            JSON.stringify({ error: 'Order not found' }),
            {
              status: 404,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        return new Response(JSON.stringify({ order }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Get orders by session ID
      if (sessionId) {
        const { data: orders, error } = await supabase
          .from('orders')
          .select(`
            id,
            order_number,
            customer_name,
            customer_email,
            total,
            status,
            payment_status,
            created_at,
            updated_at
          `)
          .eq('session_id', sessionId)
          .order('created_at', { ascending: false });

        if (error) {
          return new Response(
            JSON.stringify({ error: 'Failed to fetch orders' }),
            {
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        return new Response(JSON.stringify({ orders: orders || [] }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Get orders by email
      if (email) {
        const { data: orders, error } = await supabase
          .from('orders')
          .select(`
            id,
            order_number,
            customer_name,
            customer_email,
            total,
            status,
            payment_status,
            created_at,
            updated_at
          `)
          .eq('customer_email', email)
          .order('created_at', { ascending: false });

        if (error) {
          return new Response(
            JSON.stringify({ error: 'Failed to fetch orders' }),
            {
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        return new Response(JSON.stringify({ orders: orders || [] }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(
        JSON.stringify({ error: 'Missing query parameter: sessionId, email, or order number' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // PUT /orders/:orderId/status - Update order status
    if (req.method === 'PUT' && path.includes('/status')) {
      const orderId = path.split('/')[1];
      const { status, notes } = await req.json();

      if (!orderId || !status) {
        return new Response(
          JSON.stringify({ error: 'Missing orderId or status' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Valid statuses
      const validStatuses = [
        'pending',
        'confirmed',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
        'refunded',
      ];

      if (!validStatuses.includes(status)) {
        return new Response(
          JSON.stringify({ error: 'Invalid status value' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      const { data: order, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .select()
        .single();

      if (error || !order) {
        return new Response(
          JSON.stringify({ error: 'Failed to update order status' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Add custom note to status history if provided
      if (notes) {
        await supabase.from('order_status_history').insert([
          {
            order_id: orderId,
            status,
            notes,
          },
        ]);
      }

      return new Response(
        JSON.stringify({ success: true, order }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // PUT /orders/:orderId/payment - Update payment status
    if (req.method === 'PUT' && path.includes('/payment')) {
      const orderId = path.split('/')[1];
      const { paymentStatus } = await req.json();

      if (!orderId || !paymentStatus) {
        return new Response(
          JSON.stringify({ error: 'Missing orderId or paymentStatus' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      const validPaymentStatuses = ['pending', 'completed', 'failed', 'refunded'];

      if (!validPaymentStatuses.includes(paymentStatus)) {
        return new Response(
          JSON.stringify({ error: 'Invalid payment status value' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      const { data: order, error } = await supabase
        .from('orders')
        .update({ payment_status: paymentStatus })
        .eq('id', orderId)
        .select()
        .single();

      if (error || !order) {
        return new Response(
          JSON.stringify({ error: 'Failed to update payment status' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({ success: true, order }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Orders API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});