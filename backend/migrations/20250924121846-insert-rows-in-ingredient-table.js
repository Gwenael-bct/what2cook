'use strict';
/** @type {import('sequelize-cli').Migration} */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports = {
  async up(queryInterface, Sequelize) {
    const ingredients = [];

    const csvFilePath = path.resolve(__dirname, '../data/ingredients.csv');

    if (!fs.existsSync(csvFilePath)) {
      console.log('[ingredients migration] CSV introuvable, insertion ignorée:', csvFilePath);
      return;
    }

    await new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
          .pipe(csv())
          .on('data', (row) => {
            const nameEn = (row.name_en || '').trim();
            const nameFr = (row.name_fr || '').trim();
            if (!nameEn && !nameFr) return; // au moins un nom requis
            const spoonacularId = row.spoonacular_id ? parseInt(row.spoonacular_id, 10) : null;
            const categoryId = row.category_id ? parseInt(row.category_id, 10) : null;
            ingredients.push({
              name_en: nameEn || null,
              name_fr: nameFr || null,
              spoonacular_id: spoonacularId,
              category_id: categoryId,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          })
          .on('end', () => resolve())
          .on('error', (err) => reject(err));
    });

    if (ingredients.length > 0) {
      await queryInterface.bulkInsert('Ingredients', ingredients);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ingredients', null, {});
  }
};
