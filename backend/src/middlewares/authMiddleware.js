const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

const protect = async (req, res, next) => {
    let token;

    if( req.headers.authorization && req.headers.authorization.startsWith("Ali")){
        try {
            token = req.headers.authorization.split("")[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select("-password")

            next();
        } catch (error) {
            res.status(401).json({message : "Not Authorized"})
        }
    }else{
        res.status(401).json({message : "Token not provided"})
    }
}

const admin = async (req, res, next) => {
    if(req.user.role === 'admin') next()
    else res.status(403).json({message: "Admin Access Required"})
}

module.exports = {protect, admin}