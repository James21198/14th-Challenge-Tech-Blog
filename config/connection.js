const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (!process.env.DB_URL) {
  sequelize = new Sequelize("blog_db_rl2p_user:xSKu6D1wtVgXKw9tcNibKWuZ1QtZzTvc@dpg-cot4kqed3nmc73ds46f0-a/blog_db_rl2p");
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres'
    }
  );
}

module.exports = sequelize;