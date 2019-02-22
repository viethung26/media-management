const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.use('/shopify', require('./shopify'))
router.use('/images', require('./images'))
module.exports = router