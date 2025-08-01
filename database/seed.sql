-- Insert predefined cuisines
INSERT INTO cuisines (name, category) VALUES
-- Asian Cuisines
('Chinese', 'Asian'),
('Japanese', 'Asian'),
('Korean', 'Asian'),
('Thai', 'Asian'),
('Vietnamese', 'Asian'),
('Indian', 'Asian'),
('Filipino', 'Asian'),
('Indonesian', 'Asian'),
('Malaysian', 'Asian'),
('Singaporean', 'Asian'),

-- European Cuisines
('Italian', 'European'),
('French', 'European'),
('Spanish', 'European'),
('Greek', 'European'),
('German', 'European'),
('British', 'European'),
('Russian', 'European'),
('Portuguese', 'European'),
('Turkish', 'European'),
('Polish', 'European'),

-- American Cuisines
('American', 'American'),
('Mexican', 'American'),
('Brazilian', 'American'),
('Argentinian', 'American'),
('Peruvian', 'American'),
('Colombian', 'American'),
('Cuban', 'American'),
('Jamaican', 'American'),

-- Middle Eastern & African
('Lebanese', 'Middle Eastern'),
('Persian', 'Middle Eastern'),
('Moroccan', 'African'),
('Ethiopian', 'African'),
('Egyptian', 'Middle Eastern'),
('Israeli', 'Middle Eastern'),

-- Other
('Australian', 'Oceanian'),
('Fusion', 'Fusion'),
('Vegetarian', 'Dietary'),
('Vegan', 'Dietary'),
('Mediterranean', 'Mediterranean')

ON CONFLICT (name) DO NOTHING;