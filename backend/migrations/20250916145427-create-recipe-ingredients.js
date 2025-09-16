'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipe_ingredients', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      recipeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'recipes', key: 'id' },
        onDelete: 'CASCADE',
      },
      ingredientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ingredients', key: 'id' },
        onDelete: 'CASCADE',
      },
      quantity: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('recipe_ingredients');
  }
};
