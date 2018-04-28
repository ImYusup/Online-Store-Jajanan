const express = require('express');
const userServices = require('../services/user-services');
const userRouter = express.Router();

// method get here ===> get user here
userRouter.get('/user', async function (req, res) {
    let findAllGetUser = await userServices.getUser(req.query)
    //console.log('ini ',findQuery[0].dataValues.firstname)
    const { firstname, lastname, username, password, email, address, phone, role } = findAllGetUser[0].dataValues //or req.body
    const params = {
        firstname, lastname, username, password, email, address, phone, role
    }
    res.json(findAllGetUser)
})

// method post here ==> post register user here
userRouter.post('/user', async function (req, res) {
    const { firstname, lastname, username, password, email, address, phone, role } = req.body
    const params = {
        firstname, lastname, username, password, email, address, phone
    }
    let findAllPostUser = await userServices.postUser(params)
        .then((respon) => {
            return res.json({
                username: respon.username,
                password: respon.password
            })
        }).catch(error => {
            if (error.errors[0].message === "username_UNIQUE must be unique") {
                return res.json({ data: "your username is already exist!", error: true })
            }
            else if (error.errors[0].message === "email_UNIQUE must be unique") {
                return res.json({ data: "your email is already exist!", error: true })
            }
            else if (error.errors[0].message === "phone_UNIQUE must be unique") {
                return res.json({ data: "your phone number is already exist!", error: true })
            }
        })
})

// method post user here ==> post login
userRouter.post('/user/login', async function (req, res) {

    const { username, passwordLogin } = req.body
    const params = {
        username, passwordLogin
    }
    await userServices.getLogin(params)
        .then((respon) => {
        if (respon) {
            return res.json({
                id: respon.id,
                username: respon.username,
                password: respon.passwordLogin,
                token: respon.token
            })
        } else {
            return res.json({
                data: 'You are not registered yet',
                error: true 
            }, 401)
        }
        })
        .catch(error => {
            console.log(error)
            return res.json({
                data: error.message
        });
    })
})

// method put user  here
userRouter.put('/user/:id', async function (req, res) {
    const { firstname, lastname, username, password, email, address, phone, role } = req.body
    const params = {
        id: req.params.id, firstname, lastname, username, password, email, address, phone, role
    }
    let findUpdate = await userServices.updateUser(params)
    res.json(findUpdate)
});

// method delete user here
userRouter.delete('/user/:id', async function (req, res) {
    const { id } = req.params
    let findDelete = await userServices.deleteUser(id)
    res.json(findDelete)
});


module.exports = userRouter;