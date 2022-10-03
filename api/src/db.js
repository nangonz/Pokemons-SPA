require('dotenv').config();
const { Sequelize } = require('sequelize');
const modelPokemon = require('./models/Pokemon.js');
const modelType = require('./models/Type.js');


const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

// const sequelize = new Sequelize(`postgres://${ DB_USER }:${ DB_PASSWORD }@${ DB_HOST }:${ DB_PORT }/${ DB_NAME }`)
const sequelize = new Sequelize({
  database: DB_NAME,
  dialect: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  pool: {
    max: 3,
    min: 1,
    idle: 10000
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    keepAlive: true,
  },
  ssl: true
});


// Injectamos la conexion (sequelize) a todos los modelos
modelPokemon(sequelize)
modelType(sequelize)
// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Pokemon, Type } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Pokemon.belongsToMany(Type, { through:'Pokemon_Tipo' });
Type.belongsToMany(Pokemon, { through:'Pokemon_Tipo' });

module.exports = {
  Pokemon,
  Type,               // para poder importar los modelos así: const { Product, User } = require('./db.js');
  db: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
