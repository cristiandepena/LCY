const express = require('express');
const app = express();
const morgan = require('morgan');
const database = require('./config/database');
const bodyParser = require('body-parser');

// Importing routes
const productRoutes = require('./api/routes/products');
const productCategoriesRoutes = require('./api/routes/productCategories');
const userRoutes = require('./api/routes/users');
const orderRoutes = require('./api/routes/orders');

const port = process.env.PORT || 8080;

// Database init
database.authenticate()
  .then(() => {
    console.log('Connected!');
  })
  .catch(err => console.log(`Unable to connect: ${err}`));

// REMOVE FORCE ON PROD
database.sync({
  force: true,
  logging: console.log
}).then((data) => {
  console.log('Database Synced successfully!');
  // Logging associations
  console.log('====ASSOCIATIONS====');
  console.log('Products: ',data.models.Products.associations);
  console.log('Orders: ', data.models.Orders.associations);
  console.log('OrderDetails: ', data.models.OrderDetails.associations);
});

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Preventing CORS errors
app.use((req, res, next) => {
  // Allowing access to everyone to the API
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  };
  next();
});

// Routes 
app.use('/products', productRoutes);
app.use('/productCategories', productCategoriesRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

// Custom Error Handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(500).json({
    error: {
      message: error.message
    }
  });
});

// Default route
app.get('/', (req, res) => {
  res.end('Working');
});

app.listen(port, (err) => {
  if (err) {
    console.log(`Unable to start server: ${err}`);
  }
  console.log(`NodeJS Server listening on port ${port}`);
});