'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    static associate(models) {
      // Un ingrédient appartient à plusieurs recettes
      this.belongsToMany(models.Recipe, {
        through: models.RecipeIngredient,
        foreignKey: 'ingredient_id',
        as: 'recipes'
      });

      Ingredient.belongsTo(models.Category, { foreignKey: 'category_id' });

      // Un ingrédient peut être dispo dans plusieurs cuisines d'utilisateurs
      this.belongsToMany(models.User, {
        through: models.UserIngredient,
        foreignKey: 'ingredient_id',
        as: 'users'
      });
    }
  }
  Ingredient.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ingredient',
  });
  return Ingredient;
};