const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const RecipeIngredient = sequelize.define('RecipeIngredient', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.STRING }
}, {
  tableName: 'recipe_ingredients',
  timestamps: true
});

module.exports = RecipeIngredient;
