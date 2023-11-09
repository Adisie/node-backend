
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authRequred = (req,res,next) => {
    const token = req.cookies.auth;
    if(token){
        jwt.verify(token,process.env.JWT_KEY,(err,decodedToken)=>{
            if(err){
                res.redirect('/login')
            }else{
                next();
            }
        })
    }else{
        res.redirect('/login')
    }
}

const getUser = (req,res,next) => {
    const token = req.cookies.auth
    if(token){
        jwt.verify(token,process.env.JWT_KEY,async (err,decodedToken)=>{
            if(err){
                res.locals.user = null;
                next()
            }else{
                const user = await User.findById(decodedToken.id);
                res.locals.user = {username: user.username,email: user.email};
                next();
            }
        })
    }else {
        res.locals.user = null
        next();
    }
}

module.exports = {
    authRequred,
    getUser,
}