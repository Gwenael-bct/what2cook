'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      // Une recette contient plusieurs ingrédients
      this.belongsToMany(models.Ingredient, {
        through: models.RecipeIngredient,
        foreignKey: 'recipe_id',
        as: 'ingredients'
      });

      // Une recette peut être favorite de plusieurs utilisateurs
      this.belongsToMany(models.User, {
        through: models.Favorite,
        foreignKey: 'recipe_id',
        as: 'likedBy'
      });
    }
  }
  Recipe.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    instructions: DataTypes.TEXT,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};