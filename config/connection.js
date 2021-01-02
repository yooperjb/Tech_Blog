// import the Sequelize constructor from the library
const Sequelize = require('sequelize');
// doesn't have to be saved to variable. Gives access to .env file. 
require('dotenv').config();

// initialize sequelize
let sequelize;

//pass in MySQL information for username and password
// Sets up sequelize for JAWSDB or Localhost
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
  } else {
    // use .env variables to keep private
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });
  };

  module.exports = sequelize;