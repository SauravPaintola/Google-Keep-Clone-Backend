const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SEC = process.env.JWT_SEC //taking data from .env


const auth = (req, res, next) => {

    const token = req.header('auth-token')//getting auth-token from incoming req header

    if (!token) {
        res.status(401).send("Invalid Token")
    }

    try {
        const data = jwt.verify(token, JWT_SEC)
        req.user = data.user
    }
    catch (err) {
        res.status(401).send(err)
    }

    next()

}

module.exports = auth;