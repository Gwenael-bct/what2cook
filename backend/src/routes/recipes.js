const express = require('express');
const router = express.Router();
const { Category } = require('../../models');
const categoryController = require('../controllers/categoryController');

// Récupérer les catégories + ingrédients de l’utilisateur
router.get('/user/:userId', categoryController.getUserCategories);

// Récupérer toutes les catégories
router.get("/all", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

module.exports = router;
