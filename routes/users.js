const {Router} = require('express')
const router = Router()

const {
    login,
    signup,
} = require('../controllers/users')

router.post('/login',login)

router.post('/signup',signup)

module.exports = router