const categoryRepository = require('../repositories/categoryRepository');

async function getCategoriesWithUserIngredients(userId) {
  const categories = await categoryRepository.findCategoriesWithUserIngredients(userId);

  return categories.map(c => ({
    id: c.id,
    name: c.name,
    image: c.image,
    ingredients: c.ingredients.map(i => ({
      name: i.name_fr,
      name_en: i.name_en,
    }))
  }));
}

module.exports = { getCategoriesWithUserIngredients };
