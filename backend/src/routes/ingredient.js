const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');

router.get('/api/ingredients', ingredientController.searchIngredient);

module.exports = router;
