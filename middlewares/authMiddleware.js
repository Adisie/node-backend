const jwt = require('jsonwebtoken');

const authRequired = (req,res,next) =>{
    const token = req.cookies.auth;
    if(token){
        jwt.verify(token,'JWT_KEY',(err,decodedToken)=>{
            if(err){
                console.log(err);
                res.redirect('/login')
            }else {
                console.log(decodedToken);
                next();
            }
        })
    }else {
        res.redirect('/login')
    }

}

module.exports = {
    authRequired,
}