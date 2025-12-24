const express = require('express');
const productRoute = require('./routes/product.routes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', productRoute);

module.exports = app;