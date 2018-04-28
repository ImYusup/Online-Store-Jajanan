const order_id = require('../../database/models').Order;
const orders = require('../../database/models').Order_details;
const products = require('../../database/models').Product;
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

module.exports = {

    //method post orders here ===> post product
    postAllOrder: async (params) => {
        let postOrderId = order_id.create ({
            user_id: params.user_id
        })
        return postOrderId;

        let postOrders = orders.create({
            user_id: params.user_id,
            order_id: params.order_id,
            product_id: params.product_id,
            quantity: params.quantity
        })
        return await postOrders;

        let postStock = products.update({
            stock: params.stock
        })
        return await postStock;
    },


        //method get orders here  
        getOrder: async (queries) => {
            let opt = {}
            if (Object.keys(queries).length) {
                opt = {
                    where: {
                        [Op.or]: {
                            id: queries.id,
                            user_id: { [Op.like]: `%${queries.user_id}%` },
                            order_id: { [Op.like]: `%${queries.order_id}%` },
                            product_id: { [Op.like]: `%${queries.product_id}%` },
                            quantity: { [Op.like]: `%${queries.quantity}%` }
                        },
                    }
                }
            }
            return await orders.findAll({ where: opt.where, attributes: ['id', 'user_id', 'order_id', 'product_id', 'quantity'] })
        },

            //method put order  here => update data stock
            updateOrder: async (params) => {
                //console.log(params)
                return await orders.update({
                    user_id: params.product_name,
                    order_id: params.stock,
                    product_id: params.price,
                    quantity: params.transactions,
                }, {
                        where: {
                            id: {
                                [Op.eq]: params.id
                            }
                        }
                    })
            },
    }  