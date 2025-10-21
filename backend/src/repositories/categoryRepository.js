const { Category, Ingredient, User } = require('../../models');

async function findCategoriesWithUserIngredients(userId) {
  return Category.findAll({
    attributes: ['id', 'name', 'image'],
    include: [
      {
        model: Ingredient,
        as: 'ingredients',
        attributes: ['id', 'name_fr', 'name_en', 'category_id'],
        required: true, // on veut uniquement les catégories avec au moins un ingrédient de l'utilisateur
        include: [
          {
            model: User,
            as: 'users',
            where: { id: userId },
            required: true, // INNER JOIN pour ne garder que les ingrédients du user
            attributes: [],
            through: { attributes: [] }
          }
        ]
      }
    ]
  });
}

module.exports = { findCategoriesWithUserIngredients };
