// routes/userIngredientRoutes.js
const express = require('express');
const { addUserIngredient, deleteUserIngredient } = require('../controllers/userIngredientController');
const authenticateJwt = require('../middlewares/auth');
const router = express.Router();

router.post('/add-ingredient', authenticateJwt, addUserIngredient);

router.post('/delete-ingredient', authenticateJwt, deleteUserIngredient);

module.exports = router;
