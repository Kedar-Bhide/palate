-- Complete migration for multi-cuisine support

-- Step 1: Remove Fusion cuisine
DELETE FROM cuisines WHERE name = 'Fusion';

-- Step 2: Add new cuisines
INSERT INTO cuisines (name, category) VALUES 
-- Add Hawaiian to American
('Hawaiian', 'American'),

-- Add more Middle Eastern cuisines
('Syrian', 'Middle Eastern'),
('Jordanian', 'Middle Eastern'),

-- Add more Mediterranean cuisines (some may be duplicates but ON CONFLICT handles it)
('Cypriot', 'Mediterranean'),
('Tunisian', 'Mediterranean'),

-- Add more African cuisines
('Nigerian', 'African'),
('South African', 'African'),
('Kenyan', 'African'),
('Ghanaian', 'African'),
('Senegalese', 'African'),
('Algerian', 'African')
ON CONFLICT (name) DO NOTHING;

-- Step 3: Better organize existing cuisines
-- Move some cuisines to Mediterranean category if they make sense there
UPDATE cuisines SET category = 'Mediterranean' WHERE name IN ('Greek', 'Turkish') AND category != 'Mediterranean';

-- Step 4: Create junction table for multi-cuisine support
CREATE TABLE IF NOT EXISTS log_cuisines (
    id SERIAL PRIMARY KEY,
    log_id UUID REFERENCES cuisine_logs(id) ON DELETE CASCADE,
    cuisine_id INTEGER REFERENCES cuisines(id) ON DELETE CASCADE,
    UNIQUE(log_id, cuisine_id)
);

-- Step 5: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_log_cuisines_log_id ON log_cuisines(log_id);
CREATE INDEX IF NOT EXISTS idx_log_cuisines_cuisine_id ON log_cuisines(cuisine_id);

-- Step 6: Migrate existing data from cuisine_logs to log_cuisines
INSERT INTO log_cuisines (log_id, cuisine_id)
SELECT id, cuisine_id 
FROM cuisine_logs 
WHERE cuisine_id IS NOT NULL
ON CONFLICT (log_id, cuisine_id) DO NOTHING;

-- Step 7: Remove the old cuisine_id column from cuisine_logs
-- (We'll do this after confirming everything works)
-- ALTER TABLE cuisine_logs DROP COLUMN cuisine_id;