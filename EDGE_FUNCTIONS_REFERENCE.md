# Edge Functions Reference

## Overview

Your project uses 2 Supabase Edge Functions for backend operations:

1. **checkout** - Processes orders and checkout
2. **orders** - Retrieves and manages orders

Both functions will be deployed at:
`https://zviqnojhfxcbpuoegyhs.supabase.co/functions/v1/`

---

## 1. Checkout Function

**Endpoint:** `POST /functions/v1/checkout`

### Purpose
- Validates cart items and inventory
- Creates order in database
- Creates order items
- Saves shipping address
- Updates inventory (if tracking enabled)
- Clears cart after successful checkout

### Request Body
```typescript
{
  sessionId: string;              // Cart session ID
  customerInfo: {
    name: string;                 // Customer name
    email: string;                // Customer email
    phone?: string;               // Optional phone
    notes?: string;               // Optional order notes
  };
  shippingAddress: {
    fullName: string;             // Recipient name
    addressLine1: string;         // Street address
    addressLine2?: string;        // Apt/Suite (optional)
    city: string;                 // City
    state: string;                // State/Province
    postalCode: string;           // ZIP/Postal code
    country: string;              // Country
    phone?: string;               // Contact phone (optional)
  };
  paymentMethod?: string;         // Default: 'cash_on_delivery'
}
```

### Success Response
```typescript
{
  success: true,
  order: {
    id: string;                   // Order UUID
    orderNumber: string;          // Human-readable order number (ORD-XXXXXX)
    total: number;                // Total amount
    status: string;               // Order status
    createdAt: string;            // ISO timestamp
  }
}
```

### Error Responses
```typescript
// Empty cart
{ error: 'Cart is empty or not found' }

// Insufficient stock
{ error: 'Insufficient stock for [Product Name]. Available: X' }

// Failed to create order
{ error: 'Failed to create order' }

// Internal error
{ error: 'Internal server error', details: string }
```

### Frontend Usage Example
```typescript
const checkoutOrder = async (checkoutData) => {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/checkout`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error);
  }

  return result;
};
```

---

## 2. Orders Function

**Endpoint:** Multiple operations on `/functions/v1/orders`

### Operations

#### A. Get Orders by Session ID
**Method:** `GET /functions/v1/orders?sessionId={sessionId}`

**Purpose:** Retrieve all orders for a specific cart session

**Response:**
```typescript
{
  orders: [
    {
      id: string;
      order_number: string;
      customer_name: string;
      customer_email: string;
      total: number;
      status: string;
      payment_status: string;
      created_at: string;
      updated_at: string;
    }
  ]
}
```

#### B. Get Orders by Email
**Method:** `GET /functions/v1/orders?email={email}`

**Purpose:** Retrieve all orders for a customer email

**Response:** Same as above

#### C. Get Specific Order
**Method:** `GET /functions/v1/orders/{orderNumber}`

**Purpose:** Get complete order details including items, shipping, and status history

**Response:**
```typescript
{
  order: {
    id: string;
    order_number: string;
    session_id: string;
    customer_email: string;
    customer_name: string;
    customer_phone: string;
    subtotal: number;
    tax: number;
    shipping_cost: number;
    total: number;
    status: string;
    payment_status: string;
    payment_method: string;
    notes: string;
    created_at: string;
    updated_at: string;
    order_items: [
      {
        id: string;
        product_id: string;
        product_name: string;
        product_price: number;
        quantity: number;
        gift_wrap: boolean;
        subtotal: number;
      }
    ];
    shipping_addresses: [
      {
        id: string;
        full_name: string;
        address_line1: string;
        address_line2: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
        phone: string;
        created_at: string;
      }
    ];
    order_status_history: [
      {
        id: string;
        status: string;
        notes: string;
        created_at: string;
      }
    ];
  }
}
```

#### D. Update Order Status (Admin)
**Method:** `PUT /functions/v1/orders/{orderId}/status`

**Request Body:**
```typescript
{
  status: string;     // pending | confirmed | processing | shipped | delivered | cancelled | refunded
  notes?: string;     // Optional note about status change
}
```

**Response:**
```typescript
{
  success: true,
  order: { ... }      // Updated order object
}
```

#### E. Update Payment Status (Admin)
**Method:** `PUT /functions/v1/orders/{orderId}/payment`

**Request Body:**
```typescript
{
  paymentStatus: string;    // pending | completed | failed | refunded
}
```

**Response:**
```typescript
{
  success: true,
  order: { ... }      // Updated order object
}
```

### Frontend Usage Examples

```typescript
// Get orders by session
const getOrdersBySession = async (sessionId: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/orders?sessionId=${sessionId}`,
    {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
    }
  );
  return await response.json();
};

// Get specific order
const getOrder = async (orderNumber: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/orders/${orderNumber}`,
    {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
    }
  );
  return await response.json();
};

// Update order status (admin only)
const updateOrderStatus = async (orderId: string, status: string, notes?: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/orders/${orderId}/status`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status, notes }),
    }
  );
  return await response.json();
};
```

---

## CORS Configuration

Both functions include proper CORS headers:
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};
```

All functions handle OPTIONS preflight requests.

---

## Environment Variables

Edge functions automatically have access to:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key for admin operations

**No manual configuration needed!** Supabase injects these automatically.

---

## Error Handling

All functions return errors in this format:
```typescript
{
  error: string;      // Error message
  details?: string;   // Additional details (for server errors)
}
```

Check the HTTP status code:
- `200` - Success
- `400` - Bad request (validation error)
- `404` - Not found
- `405` - Method not allowed
- `500` - Internal server error

---

## Testing

### Test Checkout (cURL)
```bash
curl -X POST \
  'https://zviqnojhfxcbpuoegyhs.supabase.co/functions/v1/checkout' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "sessionId": "test-session-123",
    "customerInfo": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890"
    },
    "shippingAddress": {
      "fullName": "John Doe",
      "addressLine1": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "postalCode": "400001",
      "country": "India"
    }
  }'
```

### Test Get Orders (cURL)
```bash
curl -X GET \
  'https://zviqnojhfxcbpuoegyhs.supabase.co/functions/v1/orders?sessionId=test-session-123' \
  -H 'Authorization: Bearer YOUR_ANON_KEY'
```

---

## Order Status Flow

```
pending → confirmed → processing → shipped → delivered
                              ↓
                          cancelled
                              ↓
                          refunded
```

**Valid Status Values:**
- `pending` - Order placed, awaiting confirmation
- `confirmed` - Order confirmed by merchant
- `processing` - Order being prepared
- `shipped` - Order shipped to customer
- `delivered` - Order delivered successfully
- `cancelled` - Order cancelled
- `refunded` - Payment refunded

---

## Payment Status Flow

```
pending → completed
    ↓
  failed
    ↓
 refunded
```

**Valid Payment Status Values:**
- `pending` - Payment awaiting processing
- `completed` - Payment successful
- `failed` - Payment failed
- `refunded` - Payment refunded

---

## Deployment Instructions

See `DEPLOYMENT_GUIDE.md` for step-by-step instructions on deploying these functions to your Supabase project.

Quick steps:
1. Go to Supabase Dashboard > Edge Functions
2. Create new function
3. Copy code from `supabase/functions/[function-name]/index.ts`
4. Deploy

---

## Security Notes

- All functions use service role key for database operations
- RLS policies are enforced where appropriate
- Inventory checks prevent overselling
- Session-based cart isolation
- Order data protected by RLS

---

## Need Help?

Check the function logs in Supabase Dashboard:
https://supabase.com/dashboard/project/zviqnojhfxcbpuoegyhs/functions

All errors are logged with details for debugging.
