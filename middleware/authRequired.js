
const jwt = require('jsonwebtoken');

const authRequred = (req,res,next) => {
    const token = req.cookies.auth;
    if(token){
        jwt.verify(token,process.env.JWT_KEY,(err,decodedToken)=>{
            if(err){
                res.redirect('/login')
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        res.redirect('/login')
    }
}

module.exports = {
    authRequred,
}