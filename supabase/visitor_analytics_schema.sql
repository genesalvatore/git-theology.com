-- Cathedral Network Analytics
-- Simple visitor tracking system
-- Created: January 19, 2026

-- Page Views Table
CREATE TABLE IF NOT EXISTS page_views (
  id BIGSERIAL PRIMARY KEY,
  
  -- Site info
  site TEXT NOT NULL, -- git-theology.com, git-truth.com, etc.
  
  -- Page info
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  
  -- Visitor info (privacy-friendly)
  visitor_id TEXT, -- Anonymous UUID stored in localStorage
  session_id TEXT, -- Session UUID
  
  -- Technical info
  user_agent TEXT,
  screen_width INTEGER,
  screen_height INTEGER,
  
  -- Location (approximate)
  country TEXT,
  region TEXT,
  city TEXT,
  
  -- Timing
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  time_on_page INTEGER, -- seconds
  
  -- Engagement
  scrolled_percentage INTEGER,
  clicked_links BOOLEAN DEFAULT false,
  
  -- Meta
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_page_views_site ON page_views(site);
CREATE INDEX IF NOT EXISTS idx_page_views_site_date ON page_views(site, viewed_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_page_views_visitor ON page_views(visitor_id);
CREATE INDEX IF NOT EXISTS idx_page_views_date ON page_views(viewed_at DESC);

-- RLS policies
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert page views (for tracking)
CREATE POLICY "Anyone can insert page views" ON page_views
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Admins can view all page views
CREATE POLICY "Admins can view all" ON page_views
  FOR SELECT
  TO authenticated
  USING (true);

-- Visitor Stats View (aggregated)
CREATE OR REPLACE VIEW visitor_stats AS
SELECT
  site,
  DATE(viewed_at) as date,
  COUNT(*) as page_views,
  COUNT(DISTINCT visitor_id) as unique_visitors,
  COUNT(DISTINCT session_id) as sessions,
  AVG(time_on_page) as avg_time_on_page,
  AVG(scrolled_percentage) as avg_scroll_depth
FROM page_views
GROUP BY site, DATE(viewed_at)
ORDER BY date DESC;

-- Popular Pages View
CREATE OR REPLACE VIEW popular_pages AS
SELECT
  site,
  page_path,
  COUNT(*) as views,
  COUNT(DISTINCT visitor_id) as unique_views,
  AVG(time_on_page) as avg_time,
  AVG(scrolled_percentage) as avg_scroll
FROM page_views
WHERE viewed_at >= NOW() - INTERVAL '30 days'
GROUP BY site, page_path
ORDER BY views DESC
LIMIT 100;

-- Referrer Stats View
CREATE OR REPLACE VIEW referrer_stats AS
SELECT
  site,
  CASE 
    WHEN referrer IS NULL OR referrer = '' THEN 'Direct'
    WHEN referrer LIKE '%google%' THEN 'Google'
    WHEN referrer LIKE '%bing%' THEN 'Bing'
    WHEN referrer LIKE '%facebook%' THEN 'Facebook'
    WHEN referrer LIKE '%twitter%' OR referrer LIKE '%t.co%' THEN 'Twitter'
    WHEN referrer LIKE '%linkedin%' THEN 'LinkedIn'
    WHEN referrer LIKE '%reddit%' THEN 'Reddit'
    ELSE 'Other'
  END as source,
  COUNT(*) as visits,
  COUNT(DISTINCT visitor_id) as unique_visitors
FROM page_views
WHERE viewed_at >= NOW() - INTERVAL '30 days'
GROUP BY site, source
ORDER BY visits DESC;

-- Grant access to views
GRANT SELECT ON visitor_stats TO authenticated, anon;
GRANT SELECT ON popular_pages TO authenticated, anon;
GRANT SELECT ON referrer_stats TO authenticated, anon;

-- Comments
COMMENT ON TABLE page_views IS 'Tracks page views across Cathedral Network';
COMMENT ON VIEW visitor_stats IS 'Daily aggregated visitor statistics';
COMMENT ON VIEW popular_pages IS 'Most popular pages in last 30 days';
COMMENT ON VIEW referrer_stats IS 'Traffic sources in last 30 days';
