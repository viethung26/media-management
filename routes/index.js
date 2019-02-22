const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('home')
})

router.use('/shopify', require('./shopify'))
router.use('/images', require('./images'))
module.exports = router