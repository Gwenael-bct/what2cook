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

      this.belongsTo(models.Category, { foreignKey: 'category_id' });

      // Un ingrédient peut être dispo dans plusieurs cuisines d'utilisateurs
      this.belongsToMany(models.User, {
        through: models.UserIngredient,
        foreignKey: 'ingredient_id',
        as: 'users'
      });
    }
  }

  Ingredient.getById = async function(id) {
    return await Ingredient.findByPk(id);
  };

  Ingredient.init({
    name_en: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name_fr: {
      type: DataTypes.STRING,
      allowNull: true
    },
    spoonacular_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Ingredient',
    tableName: 'Ingredients'
  });
  return Ingredient;
};