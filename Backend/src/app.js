const express = require('express');
const productRoute = require('./routes/product.routes')

const app = express();

app.use(express.json());

app.use('/api/products', productRoute);

module.exports = app;