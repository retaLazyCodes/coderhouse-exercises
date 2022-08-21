const express = require('express')
const fetch = require('node-fetch')
const productsRouter = require('./routes/productos')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Loads the handlebars module
const { engine } = require('express-handlebars')

//Sets handlebars configurations 
app.engine('hbs', engine({
    extname: '.hbs',
    defautLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
}))

app.set('view engine', 'hbs')
app.set('views', './views')
// app.use(express.static('public'))
app.use(express.static(__dirname + '/public'));

app.use('/api', productsRouter)

app.get('/', (req, res) => {
    //Serves the body of the page  "main.hbs" to the container "index.hbs"
    res.render('form', { layout: 'index' })
});

app.get('/productos', async (req, res) => {
    const apiEndpoint = req.protocol + "://" + req.headers.host + '/api' + req.url
    const response = await fetch(apiEndpoint)
    const productos = await response.json()
    console.log(productos)
    res.render('productList', { productos: productos, layout: 'index' })
});


module.exports = app;