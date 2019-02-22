// const themeId = process.env.SHOPIFY_THEME_ID
const router = require('express').Router()
const request = require('request-promise')
const fileUpload = require('express-fileupload')

router.use(fileUpload())
router.get('/', (req, res)=> {
    const {name, themeID, token} = JSON.parse(req.headers.shop)
    const shop = name
    if(shop && themeID && token) {
        const url = `https://${shop}/admin/themes/${themeID}/assets.json`
        const options = {
            uri: url,
            headers: {
                'X-Shopify-Access-Token': token, 
                'content-type': 'application/json'
            }
        }
        request.get(options).then(response=> {
            res.status(200).send(response)
        })
    } else return res.status(403).send("Request need authorization")
})

router.post('/', (req, res)=> {
    const {name, themeID, token} = JSON.parse(req.headers.shop)
    const shop = name
    let data = Buffer.from(req.files.file.data).toString('base64')
    let new_asset = {
        asset: {
            key: "assets/"+req.files.file.name,
            // key: "assets/"+ new Date().getTime() +req.files.file.name,
            attachment: data
        }
    }
    if(shop && themeID && token) {
        const requestUrl = `https://${shop}/admin/themes/${themeID}/assets.json`
        const options = {
            method: 'PUT',
            uri: requestUrl,
            json: true,
            resolveWithFullResponse: true,
            headers: {
                'X-Shopify-Access-Token': token, 
                'content-type': 'application/json'
            },
            body: new_asset           
        }
        request.put(options)
        .then(response=> {
            if(response.body) res.json(response.body.asset)
            else res.json(false)
        }).catch((error) => {
            console.log(error.error)
            res.status(error.statusCode).send('error');
        })
    } else return res.status(403).send("Request need authorization")
})

router.delete('/', (req, res)=> {
    const {name, themeID, token} = JSON.parse(req.headers.shop)
    const shop = name
    const {key} = req.query
    if(shop && themeID && token && key) {
        const requestUrl = `https://${shop}/admin/themes/${themeID}/assets.json?asset[key]=${key}`
        const options = {
            method: 'DELETE',
            uri: requestUrl,
            json: true,
            resolveWithFullResponse: true,
            headers: {
                'X-Shopify-Access-Token': token, 
                'content-type': 'application/json'
            }
        }
        request.delete(options)
        .then(response=> {
            res.json(true)
        }).catch((error) => {
            console.log(error)
            res.status(error.statusCode).json(false);
        })
    } else return res.status(403).send("Request need authorization")
})
module.exports = router