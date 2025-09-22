// backend/src/routes/userIngredients.js
const express = require('express');
const router = express.Router();
const { UserIngredient } = require('../../models');

// Middleware simple d'auth pour MVP (on utilisera plus tard JWT)
const authMiddleware = (req, res, next) => {
  // Pour le moment, on simule un utilisateur connecté
  req.userId = 1;
  next();
};

// Ajouter ou mettre à jour les ingrédients de l'utilisateur
router.post('/', authMiddleware, async (req, res) => {
  const { ingredients } = req.body; // ex: [{ ingredient_id: 1, quantity: "2" }]

  try {
    // Supprime l’ancienne “cuisine”
    await UserIngredient.destroy({ where: { user_id: req.userId } });

    // Ajoute les nouveaux ingrédients
    const newIngredients = ingredients.map(i => ({
      user_id: req.userId,
      ingredient_id: i.ingredient_id,
      quantity: i.quantity
    }));

    await UserIngredient.bulkCreate(newIngredients);

    res.status(200).json({ message: 'Ingredients updated!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
