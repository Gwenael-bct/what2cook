// controllers/userIngredientController.js
const { UserIngredient } = require('../../models');

async function addUserIngredient(req, res) {
  try {
    const userId = req.user?.id;
    const { ingredientId, quantity = 1 } = req.body;

    if (!userId) return res.status(401).json({ error: 'Connexion requise' });
    if (!ingredientId) return res.status(400).json({ error: 'ingredientId requis' });

    // Vérifie si l'utilisateur a déjà cet ingrédient
    const existing = await UserIngredient.findOne({
      where: { user_id: userId, ingredient_id: ingredientId }
    });

    if (existing) {
      return res.status(200).json({ message: 'Ingrédient déjà présent' });
    }

    // Sinon, crée la ligne
    const newEntry = await UserIngredient.create({
      user_id: userId,
      ingredient_id: ingredientId,
      quantity
    });

    res.status(201).json(newEntry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

module.exports = { addUserIngredient };
