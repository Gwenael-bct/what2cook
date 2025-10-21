'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserIngredient extends Model {

    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Ingredient, { foreignKey: 'ingredient_id' });
    }
  }


  UserIngredient.init({
    user_id: DataTypes.INTEGER,
    ingredient_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserIngredient',
  });
  return UserIngredient;
};