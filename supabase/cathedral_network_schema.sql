-- Cathedral Network - Unified Orders Table
-- Created: January 18, 2026
-- Purpose: Track all orders across all 11 Cathedral sites in one unified table

CREATE TABLE IF NOT EXISTS cathedral_network_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Site tracking
  site TEXT NOT NULL, -- Which Cathedral site (git-theology.com, git-truth.com, etc.)
  
  -- Customer info
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  
  -- Order details
  order_number TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, fulfilled, cancelled, refunded
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  
  -- Items (JSON array)
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  -- Example: [{"name": "Git is Life T-Shirt", "quantity": 2, "price": 29.99, "sku": "GIL-TS-001"}]
  
  -- Payment
  stripe_payment_id TEXT,
  stripe_payment_intent_id TEXT,
  payment_status TEXT DEFAULT 'pending', -- pending, paid, failed, refunded
  
  -- Fulfillment
  api_provider TEXT, -- printful, snipcart, custom
  fulfillment_id TEXT,
  fulfillment_status TEXT, -- pending, processing, shipped, delivered
  tracking_number TEXT,
  tracking_url TEXT,
  
  -- Shipping
  shipping_address JSONB,
  -- Example: {"line1": "123 Main St", "city": "Boston", "state": "MA", "zip": "02101", "country": "US"}
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fulfilled_at TIMESTAMP WITH TIME ZONE,
  
  -- Indexes for performance
  CONSTRAINT valid_site CHECK (site IN (
    'git-theology.com',
    'git-truth.com',
    'git-islife.com',
    'git-isforever.com',
    'git-islove.com',
    'git-ispower.com',
    'git-iseternal.com',
    'git-isprivate.com',
    'git-ispublic.com',
    'git-isyourchoice.com',
    'git-manifesto.com'
  )),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'fulfilled', 'cancelled', 'refunded')),
  CONSTRAINT valid_payment_status CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded'))
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_cathedral_orders_site ON cathedral_network_orders(site);
CREATE INDEX IF NOT EXISTS idx_cathedral_orders_customer ON cathedral_network_orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_cathedral_orders_status ON cathedral_network_orders(status);
CREATE INDEX IF NOT EXISTS idx_cathedral_orders_created ON cathedral_network_orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cathedral_orders_site_created ON cathedral_network_orders(site, created_at DESC);

-- Row Level Security (RLS)
ALTER TABLE cathedral_network_orders ENABLE ROW LEVEL SECURITY;

-- Policy: Admin can see all orders
CREATE POLICY "Admin full access" ON cathedral_network_orders
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Public can insert orders (for checkout)
CREATE POLICY "Public can insert orders" ON cathedral_network_orders
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Customers can view their own orders
CREATE POLICY "Customers can view own orders" ON cathedral_network_orders
  FOR SELECT
  TO anon
  USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_cathedral_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER cathedral_orders_updated_at
  BEFORE UPDATE ON cathedral_network_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_cathedral_orders_updated_at();

-- Optional: Analytics view for quick stats
CREATE OR REPLACE VIEW cathedral_network_stats AS
SELECT
  site,
  COUNT(*) as total_orders,
  COUNT(DISTINCT customer_email) as unique_customers,
  SUM(total_amount) as total_revenue,
  AVG(total_amount) as average_order_value,
  COUNT(CASE WHEN status = 'fulfilled' THEN 1 END) as fulfilled_orders,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_orders,
  COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as orders_last_7_days,
  COUNT(CASE WHEN created_at >= NOW() - INTERVAL '30 days' THEN 1 END) as orders_last_30_days
FROM cathedral_network_orders
GROUP BY site;

-- Grant access to the stats view
GRANT SELECT ON cathedral_network_stats TO authenticated, anon;
