'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'categories'
  });

  Category.associate = function(models) {
    Category.hasMany(models.Ingredient, {
      foreignKey: 'category_id',
      as: 'ingredients'
    });
  };

  return Category;
};
