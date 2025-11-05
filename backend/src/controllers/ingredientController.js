const ingredientService = require('../services/ingredientService');

async function searchIngredient(req, res) {
  try {
    const query = req.query.q || '';
    const lang = req.query.lang || 'en'; // 'en' ou 'fr', défaut 'en'

    const ingredients = await ingredientService.searchIngredients(query, lang);
    res.status(200).json(ingredients);
  } catch (err) {
    console.error('Erreur searchIngredient:', err);
    res.status(500).json({ 
      error: 'Erreur serveur',
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
}

module.exports = { searchIngredient };
