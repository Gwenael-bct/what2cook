'use strict';
/** @type {import('sequelize-cli').Migration} */

const fs = require('fs');
const path = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {

    const jsonFilePath = path.resolve(__dirname, '../data/ingredients_mapping.json');

    if (!fs.existsSync(jsonFilePath)) {
      console.log('[ingredients migration] JSON introuvable, insertion ignorée:', jsonFilePath);
      return;
    }

    const rawData = fs.readFileSync(jsonFilePath, 'utf-8');
    let ingredientsData;
    try {
      ingredientsData = JSON.parse(rawData);
    } catch (err) {
      console.error('[ingredients migration] Erreur parsing JSON:', err);
      return;
    }

    const ingredients = ingredientsData.map((item) => ({
      name_en: (item.name || '').trim() || null,
      name_fr: (item.name_fr || '').trim() || null,
      category_id: item.category || null,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    if (ingredients.length > 0) {
      await queryInterface.bulkInsert('Ingredients', ingredients);
      console.log(`[ingredients migration] ${ingredients.length} ingrédients insérés.`);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ingredients', null, {});
  }
};
