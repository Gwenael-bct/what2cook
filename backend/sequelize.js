const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME || 'recipes_db',
    process.env.DB_USER || 'admin',
    process.env.DB_PASSWORD || 'admin',
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      logging: false,
    }
);

module.exports = sequelize;
