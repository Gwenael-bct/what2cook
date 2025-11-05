const { Ingredient, Sequelize } = require('../../models');
const { Op } = require('sequelize');

async function findIngredientsByQuery(query = '', lang = 'fr') {
  // Choix de la colonne selon la langue
  const column = lang === 'fr' ? 'name_fr' : 'name_en';

  let where = {};
  
  if (query) {
    // Utilisation de unaccent pour une recherche accent-insensitive
    // Si unaccent n'est pas disponible, Sequelize générera une erreur SQL
    // qui sera capturée au niveau du controller
    where = Sequelize.where(
      Sequelize.fn('unaccent', Sequelize.col(column)),
      { [Op.iLike]: `%${query}%` }
    );
  }

  return Ingredient.findAll({
    attributes: ['id', 'name_en', 'name_fr'],
    where,
    limit: 20,
    order: [[column, 'ASC']],
  });
}

module.exports = { findIngredientsByQuery };
