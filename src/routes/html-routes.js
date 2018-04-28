const express = require('express');
const htmlRouter = express.Router();
var path = require('path')

//call html here
htmlRouter.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'../../../public/home/home.html'));
})

htmlRouter.get('/product', function (req, res) {
    res.sendFile(path.join(__dirname+'../../../public/product/product.html'));
})


htmlRouter.get('/order', function (req, res) {
    res.sendFile(path.join(__dirname+'../../../public/order/order.html'));
})

module.exports = htmlRouter;

