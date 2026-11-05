-- =====================================================================
-- UMRI PROPERTIES - SUPABASE DATABASE INITIALIZATION SCRIPT (PHASE 1)
-- =====================================================================
-- This script:
-- 1. Creates the `properties` table with all fields, constraints, and indexes.
-- 2. Sets up Row Level Security (RLS) policies:
--    - Anyone (public) can view properties (SELECT).
--    - Only authenticated dealer (Irfan Umri) can INSERT, UPDATE, and DELETE.
-- 3. Creates the `property-media` storage bucket for photos and videos.
-- 4. Sets up Storage RLS policies for public viewing and authenticated upload.
-- =====================================================================

-- 1. CREATE PROPERTIES TABLE
CREATE TABLE IF NOT EXISTS public.properties (
  id TEXT PRIMARY KEY DEFAULT ('p_' || substr(md5(random()::text), 1, 8)),
  code TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  listing_type TEXT NOT NULL CHECK (listing_type IN ('sale', 'rent')),
  property_type TEXT NOT NULL CHECK (property_type IN ('house', 'plot', 'flat', 'shop', 'commercial', 'agricultural', 'farmhouse', 'office')),
  price NUMERIC NOT NULL,
  price_unit TEXT DEFAULT 'total',
  is_price_negotiable BOOLEAN DEFAULT false,
  security_deposit NUMERIC,
  area_id TEXT NOT NULL,
  address TEXT,
  location JSONB DEFAULT '{"lat": 31.1179, "lng": 74.4461}'::jsonb,
  nearby JSONB DEFAULT '[]'::jsonb,
  size JSONB NOT NULL,
  bedrooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  kitchens INTEGER DEFAULT 0,
  floors INTEGER DEFAULT 1,
  parking INTEGER DEFAULT 0,
  furnishing TEXT DEFAULT 'unfurnished',
  year_built INTEGER,
  facing TEXT,
  condition TEXT,
  amenities JSONB DEFAULT '[]'::jsonb,
  documents TEXT,
  cover_image TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  video JSONB,
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'under_offer', 'sold', 'rented', 'inactive')),
  dealer_id TEXT DEFAULT 'irfan-umri',
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CREATE INDEXES FOR FAST FILTERING AND SEARCH
CREATE INDEX IF NOT EXISTS idx_properties_listing_type ON public.properties(listing_type);
CREATE INDEX IF NOT EXISTS idx_properties_property_type ON public.properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_area_id ON public.properties(area_id);
CREATE INDEX IF NOT EXISTS idx_properties_price ON public.properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_slug ON public.properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON public.properties(created_at DESC);

-- 3. AUTO-UPDATE UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_property_updated ON public.properties;
CREATE TRIGGER on_property_updated
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 4. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Policy 1: Anyone (including anonymous visitors) can view properties
DROP POLICY IF EXISTS "Public can view properties" ON public.properties;
CREATE POLICY "Public can view properties"
  ON public.properties
  FOR SELECT
  USING (true);

-- Policy 2: Only logged-in dealer (authenticated) can insert new properties
DROP POLICY IF EXISTS "Dealer can insert properties" ON public.properties;
CREATE POLICY "Dealer can insert properties"
  ON public.properties
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy 3: Only logged-in dealer (authenticated) can update properties
DROP POLICY IF EXISTS "Dealer can update properties" ON public.properties;
CREATE POLICY "Dealer can update properties"
  ON public.properties
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy 4: Only logged-in dealer (authenticated) can delete properties
DROP POLICY IF EXISTS "Dealer can delete properties" ON public.properties;
CREATE POLICY "Dealer can delete properties"
  ON public.properties
  FOR DELETE
  TO authenticated
  USING (true);

-- 5. CREATE STORAGE BUCKET FOR PHOTOS & VIDEOS
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-media', 'property-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies for property-media bucket
DROP POLICY IF EXISTS "Public can view property media" ON storage.objects;
CREATE POLICY "Public can view property media"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'property-media');

DROP POLICY IF EXISTS "Dealer can upload property media" ON storage.objects;
CREATE POLICY "Dealer can upload property media"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'property-media');

DROP POLICY IF EXISTS "Dealer can update property media" ON storage.objects;
CREATE POLICY "Dealer can update property media"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'property-media');

DROP POLICY IF EXISTS "Dealer can delete property media" ON storage.objects;
CREATE POLICY "Dealer can delete property media"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'property-media');
