-- Supprimer et recréer la table pour garantir un état propre
DROP TABLE IF EXISTS pizza CASCADE;

CREATE TABLE IF NOT EXISTS pizza (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price FLOAT NOT NULL,
  image_url TEXT
);

-- Insérer les données
INSERT INTO pizza (name, price, image_url) VALUES
  ('Margherita', 8.99, 'https://example.com/images/margherita.jpg'),
  ('Pepperoni', 10.99, 'https://example.com/images/pepperoni.jpg'),
  ('Quattro Formaggi', 12.99, 'https://example.com/images/quattro-formaggi.jpg'),
  ('Vegetariana', 11.49, 'https://example.com/images/vegetariana.jpg'),
  ('Hawaiana', 11.99, 'https://example.com/images/hawaiana.jpg'),
  ('Calzone', 13.49, 'https://example.com/images/calzone.jpg'),
  ('Diavola', 12.49, 'https://example.com/images/diavola.jpg'),
  ('Napolitana', 9.99, 'https://example.com/images/napolitana.jpg');