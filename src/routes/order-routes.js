const express = require('express');
const orderServices = require('../services/order-services');
const orderRouter = express.Router();
const path = require('path');

//method get order here
orderRouter.get('/order', async function (req, res) {
    let getorder = await orderServices.getOrder(req.query)
    res.json(getorder)
})

//method post order here
orderRouter.post('/order', async function (req, res) {
    //console.log(req.body)
    const { user_id, order_id, product_id, quantity, stock } = req.body
    const params = {
        user_id, order_id, product_id, quantity, stock
    }
    await orderServices.postAllOrder(params)
        .then((results) => {
            return res.json({
                user_id: results.user_id,
                order_id: results.order_id,
                product_id: results.product_id,
                quantity: results.quantity,
                stock:results.stock,
            })
        })
})

// method put order here
orderRouter.put('/order/:id', async function (req, res) {
    const { user_id, order_id, product_id, quantity } = req.body
    const params = {
        id: req.params.id, user_id, order_id, product_id, quantity
    }
    let findUpdate = await orderServices.updateOrder(params)
    res.json(findUpdate)
});


module.exports = orderRouter;