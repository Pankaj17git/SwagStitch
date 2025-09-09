const express = require('express');
const cors = require('cors');
const path = require('path');

const productRoute = require('./routes/product.route');
const userRoute = require('./routes/user.route');
const uploadRoute = require('./routes/upload.route');
const cartRoute = require('./routes/cart.route');
const orderRoute = require('./routes/order.route')

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Static files for images
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// Routes
app.get('/', (req, res) => res.send('Express app is running! 🚀'));
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/user', userRoute);
app.use('/order', orderRoute);
app.use('/upload', uploadRoute);

module.exports = app;

