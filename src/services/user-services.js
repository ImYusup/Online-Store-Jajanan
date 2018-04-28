const users = require('../../database/models').User;
const Sequelize = require('sequelize')
const chance = require('chance').Chance();
const Op = Sequelize.Op;

module.exports = {

    //method get user here ==> get all data user
    getUser: async (queries) => {
        let opt = {}
        if (Object.keys(queries).length) {
            opt = {
                where: {
                    [Op.or]: {
                        id: queries.id,
                        username: { [Op.like]: `%${queries.name}%` },
                        email: { [Op.like]: `%${queries.email}%` },
                        address: { [Op.like]: `%${queries.address}%` },
                        phone: queries.phone,
                        role: queries.role
                    }

                },
            }
        }
        return await users.findAll({ where: opt.where, attributes: ['id','firstname', 'lastname', 'username', 'password', 'token', 'email', 'address', 'phone'] })
    },

    //method login user here
    getLogin: async (queries) => {
        let opt = {}
        if (Object.keys(queries).length) {
            console.log(Object.keys(queries).length)
            opt = {
                where: {
                    [Op.and]: {
                        username: { [Op.eq]: `${queries.username}` },
                        password: { [Op.eq]: `${queries.passwordLogin}` },
                    }
                },
            }
        }
        return await users.findOne(opt)
    },

    //method post user here => post data user
    postUser: async (params) => {
        let postData = users.create({
            firstname: params.firstname,
            lastname: params.lastname,
            username: params.username,
            password: params.password,
            token: chance.string({length: 10}),
            email: params.email,
            address: params.address,
            phone: params.phone,
            role: params.role
        })
        return await postData;
    },


    //method post user here => update data user
    updateUser: async (params) => {
        //console.log(params)
        return await users.update({
            firstname: params.firstname,
            lastname: params.lastname,
            username: params.username,
            password: params.password,
            email: params.email,
            address: params.address,
            phone: params.phone,
        }, {
                where: {
                    id: {
                        [Op.eq]: params.id
                    }
                }
            })
    },

    //method delete here => delete data user
    deleteUser: async (params) => {
        //console.log(params)
        return await users.destroy({
            where: {
                id: {
                    [Op.eq]: params
                }
            }
        })
    },
}   