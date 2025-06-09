-- Create widgets table
CREATE TABLE widgets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  theme TEXT NOT NULL DEFAULT 'light' CHECK (theme IN ('light', 'dark')),
  position TEXT NOT NULL DEFAULT 'bottom-right' CHECK (position IN ('bottom-right', 'bottom-left', 'top-right', 'top-left')),
  auto_rotate BOOLEAN NOT NULL DEFAULT true,
  rotation_interval INTEGER NOT NULL DEFAULT 5000,
  chatbot_enabled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on user_id for faster lookups
CREATE INDEX widgets_user_id_idx ON widgets(user_id);

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_widgets_updated_at
  BEFORE UPDATE ON widgets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE widgets ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to create widgets
CREATE POLICY "Allow authenticated users to create widgets"
  ON widgets
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to manage their own widgets
CREATE POLICY "Allow users to manage their own widgets"
  ON widgets
  FOR ALL
  USING (auth.uid() = user_id);

-- Create policy to allow public read access to widgets
CREATE POLICY "Allow public read access to widgets"
  ON widgets
  FOR SELECT
  USING (true); 