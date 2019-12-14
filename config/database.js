const Sequelize = require('sequelize');

const database = new Sequelize('cocinadb', 'root', 'gigiWP123', {
  host: 'localhost',
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