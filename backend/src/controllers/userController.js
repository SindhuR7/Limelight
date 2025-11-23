const User = require('../models/User.js')
const bcrypt =require('bcrypt')
const generatetoken = require('../utils/generateToken.js')

//Register Controller
const register = async (req, res) => {
    try {
        const {name,email, password} = req.body;

        const hashPassword = await bcrypt.hash(password, 10)

        const user = new User({name,email, password: hashPassword})
        const token = generatetoken(user._id)
        res.status(201).json({message : "User Created Successfully", data : user, token})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

//Login Controller
const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email})
        if(!user) return res.status(404).json({message : "User Not Found"})

        const match = await bcrypt.compare(password, user.password)
        if(!match) return res.status(400).json({message : "Incorrect Password"});

        const token = generatetoken(user._id)
        res.status(200).json({message: "Login Success", token})

    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

module.exports = {register, login}