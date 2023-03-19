const express = require('express');
const { connection } = require('./db/conn');
require('dotenv').config();
const PORT = process.env.PORT
const app = express()

app.listen(PORT , async()=>{
    try {
        await connection
        console.log('database connected')

    } catch (error) {
        console.log('database error')
    }
    console.log('connection successful')
})