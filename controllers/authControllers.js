

const login_get = (req,res) => {
    res.status(200).render('login',{title:"Login"})
}

const login_post = (req,res) => {
    res.status(200).json({
        message: "Login"
    })
}

const signup_get = (req,res) => {
    res.status(200).render('signup',{title:"Signup"})
}

const signup_post = (req,res) => {
    res.status(200).json({
        message: "Signup"
    })
}

module.exports = {
    login_get,
    login_post,
    signup_get,
    signup_post,
}

