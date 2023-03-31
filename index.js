const express = require('express');
const cors = require('cors');
const { connection } = require('./db/conn');
const userRouter = require('./routes/user.routes');
require('dotenv').config(); //requiring dotenv to take data from .env file
const PORT = process.env.PORT //taking data from .env
const app = express()
// app.use(cors()) //adding cross origin 
app.use(express.json()) //incoming json data will be converted in objects


app.use('/api/user', userRouter)


app.listen(8000, async () => {
    try {
        await connection
        console.log('database connected')

    } catch (error) {
        console.log('database error')
    }
    console.log('connection successful' , PORT)
})