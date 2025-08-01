-- Remove Fusion cuisine and update existing data
DELETE FROM cuisines WHERE name = 'Fusion';

-- Add Hawaiian to American category
INSERT INTO cuisines (name, category) VALUES ('Hawaiian', 'American') ON CONFLICT (name) DO NOTHING;

-- Add more Middle Eastern cuisines
INSERT INTO cuisines (name, category) VALUES 
('Syrian', 'Middle Eastern'),
('Jordanian', 'Middle Eastern')
ON CONFLICT (name) DO NOTHING;

-- Expand Mediterranean category (some may be duplicates but ON CONFLICT handles it)
INSERT INTO cuisines (name, category) VALUES 
('Cypriot', 'Mediterranean'),
('Tunisian', 'Mediterranean')
ON CONFLICT (name) DO NOTHING;

-- Add more African cuisines
INSERT INTO cuisines (name, category) VALUES 
('Nigerian', 'African'),
('South African', 'African'),
('Kenyan', 'African'),
('Ghanaian', 'African'),
('Senegalese', 'African'),
('Algerian', 'African')
ON CONFLICT (name) DO NOTHING;

-- Update existing cuisines to have better categorization
-- Move some cuisines to Mediterranean category if they're not already there
UPDATE cuisines SET category = 'Mediterranean' WHERE name IN ('Greek', 'Turkish') AND category != 'Mediterranean';