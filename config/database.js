const Sequelize = require('sequelize');

const database = new Sequelize('cocinadb', 'root', 'gigiWP123', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 1000,
  },
});

// REMOVE FORCE ON PROD
database.sync({ force: true })
  .then(() => {
    console.log('Database sync successfully!');

  })
  .catch(err => {
    console.log(`Error during sync: ${err}`);
  });

module.exports = database;