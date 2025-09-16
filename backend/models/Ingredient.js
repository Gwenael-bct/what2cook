const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Ingredient = sequelize.define('Ingredient', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
}, {
  tableName: 'ingredients',
  timestamps: true
});

module.exports = Ingredient;
