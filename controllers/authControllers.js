const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

// functions

const MAX_AGE = 60 * 15;

const errorHandler = err => {
    console.log(err.message)
    const errors = {username: '',email: '',password: ''}

    if(err.message === "Username not exist"){
        errors.username = "Username not exist"
    }

    if(err.message === "Wrong password"){
        errors.password = "Wrong password"
    }

    if(err.code === 11000){
        if(err.message.includes('username')){
            errors.username = "Username is already exist"
        }
        if(err.message.includes('email')){
            errors.email = "Email address is already exist"
        }

        return errors;
    }

    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }
    return errors
}

const createToken = id => {
    return jwt.sign({id},process.env.JWT_KEY,{expiresIn: MAX_AGE })
}

const login_get = (req,res) => {
    res.status(200).render('login',{title:"Login"})
}

const login_post = async (req,res) => {
    const {username,password} = req.body;
    try {
        const user = await User.findOne({username})
        if(user){
            const isPassMatch = bcryptjs.compareSync(password,user.password);
            if(isPassMatch){
                const token = createToken(user._id);
                res.cookie("auth",token,{maxAge: MAX_AGE*1000})
                res.status(200).json({user: user._id})
                return
            }
            throw Error("Wrong password")
        }
        throw Error("Username not exist")

    }catch(err){
        const errors = errorHandler(err);
        res.status(400).json({errors})
    }
}

const signup_get = (req,res) => {
    res.status(200).render('signup',{title: "Sign up"})
}

const signup_post = async (req,res) => {
    const {username,email,password} = req.body;
    try{
        const user = await User.create({username,email,password})
        const token = await createToken(user._id);
        res.cookie("auth",token,{maxAge: MAX_AGE * 1000})
        res.status(200).json({user: user._id})
    }catch(err){
        const errors = errorHandler(err);
        res.status(400).json({errors});
    }
}



module.exports = {
    login_get,
    login_post,
    signup_get,
    signup_post,
}

