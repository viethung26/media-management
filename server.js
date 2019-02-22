require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT||3000
const path = require('path')

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views') )
app.use(require('./routes'))
app.use('/shopify', express.static('./public'))
app.listen(PORT, () => {
    console.log('App is running on port 3000...');
})