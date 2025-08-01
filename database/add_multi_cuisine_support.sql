-- Add support for multiple cuisines per log entry

-- Create a junction table for log-cuisine relationships
CREATE TABLE IF NOT EXISTS log_cuisines (
    id SERIAL PRIMARY KEY,
    log_id UUID REFERENCES cuisine_logs(id) ON DELETE CASCADE,
    cuisine_id INTEGER REFERENCES cuisines(id) ON DELETE CASCADE,
    UNIQUE(log_id, cuisine_id)
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_log_cuisines_log_id ON log_cuisines(log_id);
CREATE INDEX IF NOT EXISTS idx_log_cuisines_cuisine_id ON log_cuisines(cuisine_id);

-- Migrate existing data from cuisine_logs to log_cuisines
INSERT INTO log_cuisines (log_id, cuisine_id)
SELECT id, cuisine_id 
FROM cuisine_logs 
WHERE cuisine_id IS NOT NULL
ON CONFLICT (log_id, cuisine_id) DO NOTHING;

-- Remove the old cuisine_id column from cuisine_logs (we'll do this after testing)
-- ALTER TABLE cuisine_logs DROP COLUMN cuisine_id;