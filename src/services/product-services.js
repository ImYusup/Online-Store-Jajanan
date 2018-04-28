const products = require('../../database/models').Product;
const Sequelize = require('sequelize')
const Op = Sequelize.Op;


module.exports = { 

    //method get product here ==> get all product 
    getProduct: async (queries) => {
        let opt = {}
        if (Object.keys(queries).length) {
            opt = {
                where: {
                    [Op.or]: {
                        id: queries.id,
                        product_name: { [Op.like]: `%${queries.product_name}%` },
                        stock: { [Op.like]: `%${queries.stock}%` },
                        price: { [Op.like]: `%${queries.price}%` },
                        transactions: { [Op.like]: `%${queries.transactions}%` },
                    }
                },
            }
        }
    return await products.findAll({ where: opt.where, attributes: ['id','product_name','price','transactions'] })
    },

    //method post product here ===> post product
    postProduct: async (params) => {
        let postData = products.create({
            product_name: params.product_name,
            stock: params.stock,
            price: params.price,
            transactions: params.transactions,
        })
        return await postData;
    },

    //method post product here => update data product
    updateProduct: async (params) => {
        //console.log(params)
        return await products.update({
            product_name: params.product_name,
            stock: params.stock,
            price: params.price,
            transactions: params.transactions,
        }, {
                where: {
                    id: {
                        [Op.eq]: params.id
                    }
                }
            })
    },
    //method post product here => update data product
    updateProduct: async (params) => {
        //console.log(params)
        return await products.update({
            product_name: params.product_name,
            stock: params.stock,
            price: params.price,
            transactions: params.transactions,
        }, {
                where: {
                    id: {
                        [Op.eq]: params.id
                    }
                }
            })
    },

    //method delete here => delete data product
    deleteProduct: async (params) => {
        //console.log('************',params)
        return await products.destroy({
            where: {
                id: {
                    [Op.eq]: params
                }
            }
        })
    },

}