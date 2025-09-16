const sequelize = require('../sequelize');
const User = require('./User');
const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');
const Favorite = require('./Favorite');
const RecipeIngredient = require('./RecipeIngredient');

// Associations
User.belongsToMany(Recipe, { through: Favorite, foreignKey: 'user_id' });
Recipe.belongsToMany(User, { through: Favorite, foreignKey: 'recipe_id' });

Recipe.belongsToMany(Ingredient, { through: RecipeIngredient, foreignKey: 'recipe_id' });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredient, foreignKey: 'ingredient_id' });

module.exports = {
  sequelize,
  User,
  Recipe,
  Ingredient,
  Favorite,
  RecipeIngredient
};
