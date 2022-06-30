const express = require('express')
const fetch = require('node-fetch')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

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
app.set('views', __dirname + '/views')

const productsRouter = require('./routes/productos')
app.use('/api', productsRouter)

app.get('/productos', async (req, res) => {
    const apiEndpoint = req.protocol + "://" + req.headers.host + '/api' + req.url
    console.log(apiEndpoint)
    const response = await fetch(apiEndpoint)
    const productos = await response.json()
    console.log(productos)
    res.render('productList.hbs', { productos: productos, layout: 'index' })
});

const fs = require('fs')

app.get('/productos/template', async (req, res) => {
    fs.readFile(__dirname + '/views/productList.hbs', 'utf8', (error, data) => {
        if (error) {
            throw error;
        }
        console.log(data.toString())
        res.send(data.toString())
    });
});

module.exports = httpServer;