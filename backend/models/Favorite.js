const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');
const Recipe = require('./Recipe');

const Favorite = sequelize.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
}, {
  tableName: 'favorites',
  timestamps: true
});

User.belongsToMany(Recipe, { through: Favorite, foreignKey: 'userId' });
Recipe.belongsToMany(User, { through: Favorite, foreignKey: 'recipeId' });

module.exports = Favorite;
