'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Un utilisateur peut avoir plusieurs favoris
      this.belongsToMany(models.Recipe, {
        through: models.Favorite,
        foreignKey: 'user_id',
        as: 'favorites'
      });

      // Un utilisateur a une "cuisine" → ingrédients dispo
      this.belongsToMany(models.Ingredient, {
        through: models.UserIngredient,
        foreignKey: 'user_id',
        as: 'pantry'
      });
    }
  }

  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};