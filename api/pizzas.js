// Cette approche nécessite un petit serveur Express minimal

import express from 'express';
import pg from 'pg';
import cors from 'cors';

const { Pool } = pg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'chatbot',
  user: process.env.DB_USER || 'chatbot',
  password: process.env.DB_PASSWORD || 'chatbot',
});

// Test database connection on startup
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Database connected successfully at:', res.rows[0].now);
  }
});

app.get('/api/pizzas', async (req, res) => {
  try {
    const result = await pool.query('SELECT name, price, image_url FROM pizza ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Erreur DB:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des pizzas', details: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
});