const express = require('express');
const productRoute = require('./routes/product.routes');
const paymentRoute = require('./routes/payment.routes')
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', productRoute);
app.use('/api/payments', paymentRoute);

module.exports = app;