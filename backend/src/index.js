const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'recipes_db',
  port: 5432,
});

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Exemple endpoint pour récupérer les recettes
app.get('/recipes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recipes'); // table à créer
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
