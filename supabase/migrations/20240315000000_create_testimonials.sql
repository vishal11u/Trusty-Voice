-- Create testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  widget_id UUID NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'published', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on widget_id for faster lookups
CREATE INDEX testimonials_widget_id_idx ON testimonials(widget_id);

-- Create index on status for filtering
CREATE INDEX testimonials_status_idx ON testimonials(status);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to published testimonials
CREATE POLICY "Allow public read access to published testimonials"
  ON testimonials
  FOR SELECT
  USING (status = 'published');

-- Create policy to allow authenticated users to create testimonials
CREATE POLICY "Allow authenticated users to create testimonials"
  ON testimonials
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow widget owners to manage their testimonials
CREATE POLICY "Allow widget owners to manage their testimonials"
  ON testimonials
  FOR ALL
  USING (
    widget_id IN (
      SELECT id FROM widgets WHERE user_id = auth.uid()
    )
  ); 