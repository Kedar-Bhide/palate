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
('Hawaiian', 'American'),
('Mexican', 'American'),
('Brazilian', 'American'),
('Argentinian', 'American'),
('Peruvian', 'American'),
('Colombian', 'American'),
('Cuban', 'American'),
('Jamaican', 'American'),

-- Middle Eastern Cuisines
('Lebanese', 'Middle Eastern'),
('Persian', 'Middle Eastern'),
('Egyptian', 'Middle Eastern'),
('Israeli', 'Middle Eastern'),
('Syrian', 'Middle Eastern'),
('Jordanian', 'Middle Eastern'),

-- Mediterranean Cuisines
('Greek', 'Mediterranean'),
('Italian', 'Mediterranean'),
('Spanish', 'Mediterranean'),
('Turkish', 'Mediterranean'),
('Moroccan', 'Mediterranean'),
('Tunisian', 'Mediterranean'),
('Cypriot', 'Mediterranean'),

-- African Cuisines
('Moroccan', 'African'),
('Ethiopian', 'African'),
('Nigerian', 'African'),
('South African', 'African'),
('Kenyan', 'African'),
('Ghanaian', 'African'),
('Senegalese', 'African'),
('Tunisian', 'African'),
('Algerian', 'African'),
('Egyptian', 'African'),

-- Other
('Australian', 'Oceanian'),
('Vegetarian', 'Dietary'),
('Vegan', 'Dietary')

ON CONFLICT (name) DO NOTHING;