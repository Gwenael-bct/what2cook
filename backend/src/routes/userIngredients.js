// routes/userIngredientRoutes.js
const express = require('express');
const { addUserIngredient } = require('../controllers/userIngredientController');
const authenticateJwt = require('../middlewares/auth');
const router = express.Router();

// POST /api/user-ingredients/add-ingredient (nécessite authentification)
router.post('/add-ingredient', authenticateJwt, addUserIngredient);

module.exports = router;
