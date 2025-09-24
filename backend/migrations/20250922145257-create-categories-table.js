'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
    await queryInterface.bulkInsert('categories', [
      { id: 1, name: 'fruits', image: 'images/categories/fruits.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'légumes', image: 'images/categories/legumes.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'céréales', image: 'images/categories/cereales.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'produits laitiers', image: 'images/categories/produits_laitiers.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'viandes et volailles', image: 'images/categories/viandes_volailles.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: 'poissons et fruits de mer', image: 'images/categories/poissons_fruits_mer.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 7, name: 'noix et graines', image: 'images/categories/noix_graines.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 8, name: 'épices et herbes', image: 'images/categories/epices_herbes.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 9, name: 'boissons', image: 'images/categories/boissons.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 10, name: 'produits sucrés / desserts', image: 'images/categories/sucres_desserts.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 11, name: 'huiles et graisses', image: 'images/categories/huiles_graisses.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 12, name: 'sauces et condiments', image: 'images/categories/sauces_condiments.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 13, name: 'boulangerie et pâtisserie', image: 'images/categories/boulangerie_patisserie.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 14, name: 'légumineuses', image: 'images/categories/legumineuses.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 15, name: 'pâtes et riz', image: 'images/categories/pates_riz.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 16, name: 'plats préparés', image: 'images/categories/plats_prepares.png', createdAt: new Date(), updatedAt: new Date() },
      { id: 17, name: 'divers', image: 'images/categories/divers.png', createdAt: new Date(), updatedAt: new Date() }
    ]);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categories');
  }
};
