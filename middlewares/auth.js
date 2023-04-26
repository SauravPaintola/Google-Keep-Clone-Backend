const jwt = require('jsonwebtoken');
const JWT_SEC = process.env.JWT_SEC //taking data from .env


const auth = (req, res, next) => {

    const token = req.header('auth-token')//getting auth-token from incoming req header

    if (!token) {
        return res.status(401).send("Invalid Token")
    }

    try {
        const data = jwt.verify(token, JWT_SEC)
        req.user = data.user
    }
    catch (err) {
        return res.status(401).send("Invalid Token")
    }

    next()

}

module.exports = auth;