
const {Router} = require('express');

const router = Router();

// importing routes
const authControllers = require('../controllers/authControllers');

router.get('/login',authControllers.login_get)
router.post('/login',authControllers.login_post)
router.get('/signup',authControllers.signup_get)
router.post('/signup',authControllers.signup_post)

module.exports = router;