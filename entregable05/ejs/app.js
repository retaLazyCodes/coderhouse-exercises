const express = require('express')
const fetch = require('node-fetch')
const productsRouter = require('./routes/productos')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.use('/api', productsRouter)

app.get('/', (req, res) => {
    res.render('pages/index', { body: 'form' });
});

app.get('/productos', async (req, res) => {
    const apiEndpoint = req.protocol + "://" + req.headers.host + '/api' + req.url
    const response = await fetch(apiEndpoint)
    const productos = await response.json()
    console.log(productos)
    res.render('pages/index', { productos: productos, body: 'productList' })
});


module.exports = app;