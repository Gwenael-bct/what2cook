'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      UPDATE categories
      SET image = CONCAT('assets/images/categories/', REGEXP_REPLACE(image, '^.*categories/', ''))
      WHERE image IS NOT NULL AND image <> '';
    `);
  },

  async down(queryInterface, Sequelize) {
  }
}; 