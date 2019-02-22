const express = require('express')
const router = express.Router()
const scopes =  'read_themes, write_themes, read_products, write_products'
const crypto = require('crypto')
const cookie = require('cookie')
const nonce = require('nonce')()
const querystring = require('querystring')
const request = require('request-promise')

const apiKey = process.env.SHOPIFY_API_KEY
const apiSecret = process.env.SHOPIFY_API_SECRET

const forwardingAddress = process.env.SERVER_ADDRESS

router.get('/', (req, res) => {
    const shop = req.query.shop
    if (shop) {
        const state = nonce();
        const redirectUri = forwardingAddress + '/shopify/callback'
        const installUrl = 'https://' + shop + '/admin/oauth/authorize?client_id=' + apiKey +
        '&scope=' + scopes +
        '&state=' + state +
        '&redirect_uri=' + redirectUri
        res.cookie('state', state)
        res.redirect(installUrl)
    } else {
        return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
    }
  })

router.get('/callback', (req, res)=> {
    const {shop, hmac, code, state} = req.query
    const stateCookie = cookie.parse(req.headers.cookie).state
      
    if(state !== stateCookie) {
        return res.status(403).send('Request origin cannot be verified')
    }

    if(shop && hmac && code) {
        const map = Object.assign({}, req.query)
        delete map['signature']
        delete map['hmac']
        const message = querystring.stringify(map)
        const providedHmac = Buffer.from(hmac, 'utf-8')
        const generatedHash = Buffer.from(
            crypto.createHmac('sha256', apiSecret)
            .update(message)
            .digest('hex'), 'utf-8'
        )
        let hashEquals = false
        try {
            hashEquals = crypto.timingSafeEqual(generatedHash, providedHmac)
        } catch(e) {
            hashEquals = false
        }
        if(!hashEquals) {
            return res.status(400).send('HMAC validation failed')
        }
        const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token'
        const accessTokenPayload = {
            client_id: apiKey,
            client_secret: apiSecret,
            code
        }
        request.post(accessTokenRequestUrl, {json: accessTokenPayload}).then(accessTokenResponse=> {
            const accessToken = accessTokenResponse.access_token
            const themesRequestUrl = 'https://' + shop + '/admin/themes.json'
            let themeID = ''
            const options = {
                method: 'GET',
                uri: themesRequestUrl,
                json: true,
                resolveWithFullResponse: true,
                headers: {
                    'X-Shopify-Access-Token': accessToken, 
                    'content-type': 'application/json'
                }
            }
            request.get(options).then(response=> {
                const themes = response.body.themes
                const index = themes.findIndex(theme=> theme.role === 'main')
                themeID = themes[index].id
                res.render('index', {shop, token: accessToken, themeID})
            })
        }).catch((error) => {
            console.log(error.error)
            res.status(error.statusCode).send('error');
          })
    } else {
        res.status(400).send('Required parameters missing')
    }
})

module.exports = router