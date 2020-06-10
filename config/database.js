const Sequelize = require('sequelize');

console.log(process.env);

const database = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 1000,
  },
  
  define: {
    freezeTableName: true,
    charset: 'utf8',
    timestamps: true
  },

  
});

module.exports = database;