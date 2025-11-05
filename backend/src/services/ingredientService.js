const ingredientRepository = require('../repositories/ingredientRepository');

async function searchIngredients(query, lang) {
  const ingredients = await ingredientRepository.findIngredientsByQuery(query, lang);

  return ingredients.map(i => ({
    id: i.id,
    name_en: i.name_en,
    name_fr: i.name_fr,
  }));
}

module.exports = { searchIngredients };
