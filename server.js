const express = require('express');
const app = express();
const morgan = require('morgan');
const database = require('./config/database');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/product');
const productCategoriestRoutes = require('./routes/productCategory');

const port = process.env.PORT || 8080;

database.authenticate()
  .then(() => {
    console.log('Connected!');
  })
  .catch(err => console.log(`Unable to connect: ${err}`));

// REMOVE FORCE ON PROD
database.sync({ force: true, logging: console.log }).then((data) => {
  console.log('Database Synced successfully!');
  console.log(data.models);

}).catch(err => {
  console.log(`Database Sync error: ${err}`);
});


// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json);
app.use('/', productCategoriestRoutes);
app.use('/', productRoutes);
// Routes

// Default route
app.get('/', (req, res) => {
  res.end('Working');
});

app.listen(port, (err) => {
  if (err) {
    console.log(`Unable to start server: ${err}`);
  }
  console.log(`NodeJS Server listening on port ${port}`)
});    