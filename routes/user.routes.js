const express = require('express');
const userModel = require('../models/UserModel');
const bcrypt = require('bcrypt');

const userRouter = express.Router()


userRouter.post('/register', async (req, res) => {

    const { name, email, password } = req.body

    try {
        if (await userModel.findOne({ email: req.body.email })) {
            res.status(400).send({
                error: "This user email already exist"
            })

        }

        else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const newUser = userModel.create({
                name,
                email,
                password: hashedPassword
            })
            res.status(201).send({
                responce: {
                    "user": name,
                    "email": email
                }
            })
        }
    } catch (error) {


        res.status(400).send(error)

    }


})

userRouter.post('/login', async () => {
    try {

        if (await userModel.findOne({ email: req.body.email })) {

        }

        else {
            res.status(400).send({
                "error": "Please try to login with credential"
            })
        }

    } catch (error) {

    }
})

module.exports = userRouter