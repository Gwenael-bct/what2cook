'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Ingredients', 'name_fr', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Ingredients', 'category_id');
    await queryInterface.removeColumn('Ingredients', 'name_fr');
  }
};
