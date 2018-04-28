const express = require('express');
const productServices = require('../services/product-services');
const productRouter = express.Router();
const path = require('path');

//method get product here
productRouter.get('/product', async function (req, res) {
    let findAllGetProduct = await productServices.getProduct(req.query)
    res.json(findAllGetProduct)
})


//method post product here
productRouter.post('/product', async function (req, res) {
    //console.log(req.body)
    const { product_name, stock, price, transactions } = req.body
    const params = {
        product_name, stock, price, transactions
    }
    await productServices.postProduct(params)
        .then((results) => {
            return res.json({
                product_name: results.product_name,
                stock: results.stock,
                price: results.price,
                transactions: results.transactions,
            })
        })
})

// method put product here
productRouter.put('/product/:id', async function (req, res) {
    const { product_name, stock, price, transactions } = req.body
    const params = {
        id: req.params.id, product_name, stock, price, transactions
    }
    let findUpdate = await productServices.updateProduct(params)
    res.json(findUpdate)
});

// method delete product here
productRouter.delete('/product/:id', async function (req, res) {
    const { id } = req.params
    let findDelete = await productServices.deleteProduct(id)
    res.json(findDelete)
});

module.exports = productRouter;