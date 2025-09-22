const express = require('express');
const cookieParser = require('cookie-parser');
const { Pool } = require('pg');
const cors = require('cors');

const path = require('path');
require('module-alias/register');

const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8080'],
  credentials: true
}));app.use(express.json());
app.use(cookieParser());

// Connexion à PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const userIngredientsRoutes = require('./routes/userIngredients');
app.use('/api/user-ingredients', userIngredientsRoutes);

const authGoogleRoutes = require('./routes/authGoogle');
app.use('/api/auth', authGoogleRoutes);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
