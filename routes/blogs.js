const {Router} = require('express')

const {
    get_all_blogs
} = require('../controllers/blogs')

const router = Router()

router.get('/',get_all_blogs)

module.exports = router