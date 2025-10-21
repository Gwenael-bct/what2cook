const categoryService = require('../services/categoryService');

async function getUserCategories(req, res) {
  try {
    const userId = req.params.userId;
    const categories = await categoryService.getCategoriesWithUserIngredients(userId);
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
}

module.exports = { getUserCategories };