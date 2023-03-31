const express = require('express');
const userModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); //requiring dotenv to take data from .env file
const JWT_SEC = process.env.JWT_SEC //taking data from .env

console.log(JWT_SEC)

const userRouter = express.Router()


userRouter.post('/register', async (req, res) => { //register route created 

    const { name, email, password } = req.body // destructuring req body to get out name, email, and password

    try {
        if (await userModel.findOne({ email: req.body.email })) { // checking if user is already available in userData base
            res.status(400).send({ //if yes sending error for user already exist
                error: "This user email already exist"
            })

        }

        else { // if not then 
            const salt = await bcrypt.genSalt(10) //generating a salt using bcrypt
            const hashedPassword = await bcrypt.hash(password, salt)//hashing the password entered by user to make it non decodable
            const newUser = userModel.create({ // creating a new data which will be added in database directly with any other work (or you can use new to create new doc and then use save method to save it in database)
                name,
                email,
                password: hashedPassword
            })

            const data = {
                user: {
                    id: newUser.id
                }
            }

            const token = jwt.sign(data, JWT_SEC) // creating token with jwt to have a secure data transfer
            res.send({
                "message": "user logged in successfully",
                "token": token,
                "status": 1
            })
        }
    } catch (error) {

        res.status(400).send(error)

    }


})

userRouter.post('/login', async (req, res) => { //creating a route for user login
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email: email }) //checking if the mail entered by user exist in database
        if (!user) { //if not
            res.status(400).send({//sending response to try with some other credentials
                "error": "Please try to login with correct credential"
            })
        }

        else { //if yes
            const passCompare = await bcrypt.compare(password, user.password) //comparing password entered by user and password saved in database
            if (!passCompare) { //checking password is same or not
                res.status(400).send({//if not then sensing bad response
                    "error": "Please try to login with correct credential"
                })

            }
            else {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const token = jwt.sign(data, JWT_SEC) // creating token with jwt to have a secure data transfer
                res.send({
                    "message": "user logged in successfully",
                    "token": token,
                    "status": 1
                })
            }
        }

    } catch (error) {
        res.send(error)
    }
})

module.exports = userRouter