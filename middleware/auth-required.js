const jwt = require('jsonwebtoken')
const User = require('../models/users')


const authRequired = (req,res,next) => {
    const token = req.cookies.auth 
    if(token){
        jwt.verify(token,process.env.JWT_KEY,async (err,decodedToken)=>{
            if(err){
                return res.status(401).json({
                    errors: 'AUTH_FAILED'
                })
            }

            const user = await User.findById(decodedToken._id)
            res.user = {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                }
            next()
        })
    }else {
        res.status(401).json({
            errors: "AUTH_FAILED"
        })
    }
}

module.exports = {
    authRequired,
}