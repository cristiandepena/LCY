const express = require('express');
const app = express();
const morgan = require('morgan');
const database = require('./config/database');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/product');

const port = process.env.PORT || 8080;

database.authenticate()
.then(() => {
    console.log('Connected!');
})
.catch(err => console.log(`Unable to connect: ${err}`));

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json);
app.use('/', productRoutes);
// Routes

// Default route
app.get('/', (req, res) => {
    res.end("Working");
});

app.listen(port, (err) => {
    if(err) {
        console.log(`Unable to start server: ${err}`);
    }
    console.log(`NodeJS Server listening on port ${port}`)
});    