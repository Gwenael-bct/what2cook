const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');

const RecipeIngredient = sequelize.define('RecipeIngredient', {
  quantity: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'recipe_ingredients',
  timestamps: false
});

Recipe.belongsToMany(Ingredient, { through: RecipeIngredient, foreignKey: 'recipeId' });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredient, foreignKey: 'ingredientId' });

module.exports = RecipeIngredient;
