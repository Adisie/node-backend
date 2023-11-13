const bcryptjs = require('bcryptjs')
const User = require('../models/users')

// utils
const {
    errorHandler,
    createToken,
    MAX_AGE
} = require('../utils/users')

const login = async (req,res) => {
    const {username,password} = req.body 
    try {
        const user = await User.findOne({username})
        if(user){
            const isPassMatch = bcryptjs.compareSync(password,user.password)
            if(isPassMatch){
                const token = createToken(user._id)
                res.cookie('auth',token,{
                    maxAge: 1000 * MAX_AGE,
                })
                res.status(200).json({
                    user: {
                        _id: user._id,
                        username: user.username,
                        email: user.email
                    }
                })
                return
            }
            throw Error('Wrong Password')
        }
        throw Error('Username not exist')
    }catch(err){
        const errors = errorHandler(err)
        res.status(400).json({errors})
    }
}

const signup = async (req,res) => {
    const {username,email,password} = req.body 
    try {
        const user = await User.create({username,email,password})
        const token = createToken(user._id)
        res.cookie('auth',token,{
            maxAge: MAX_AGE * 1000,
        })
        res.status(200).json({user: {
            _id: user._id,
            username: user.username,
            email: user.email
        }})
    }catch(err){
        const errors = errorHandler(err)
        res.status(400).json({errors})
    }
}

module.exports = {
    login,
    signup,
}