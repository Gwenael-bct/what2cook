const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Recipe = sequelize.define('Recipe', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
}, {
  tableName: 'recipes',
  timestamps: true
});

module.exports = Recipe;
