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

const { router, container } = require('./routes/productos')
app.use('/api', router)

const { msgRouter, msgContainer } = require('./routes/messages')
app.use('/api', msgRouter)

app.get('/productos', async (req, res) => {
    // const apiEndpoint = req.protocol + "://" + req.headers.host + '/api' + req.url
    // console.log(apiEndpoint)
    // const response = await fetch(apiEndpoint)
    // const productos = await response.json()
    const productos = container.getAll()
    console.log(productos)
    res.render('productList.hbs', { productos: productos, layout: 'index' })
});

const fs = require('fs')

app.get('/productos/template', async (req, res) => {
    fs.readFile(__dirname + '/views/productList.hbs', 'utf8', (error, data) => {
        if (error) {
            throw error;
        }
        res.send(data.toString())
    });
});

app.get('/mensajes/template', async (req, res) => {
    fs.readFile(__dirname + '/views/chat.hbs', 'utf8', (error, data) => {
        if (error) {
            throw error;
        }
        res.send(data.toString())
    });
});


const { getDateTime } = require('./helpers/date')

io.on('connection', socket => {
    console.log('Nuevo cliente conectado!')

    /* Envio los productos al cliente que se conectó */
    const productos = container.getAll()
    socket.emit('productos', productos)

    /* Escucho el producto enviado por el cliente y se los propago a todos */
    socket.on('newProduct', data => {
        io.sockets.emit('productos', productos)
    });


    const mensajes = msgContainer.getAll()
    /* Envio los mensajes al cliente que se conectó */
    socket.emit('mensajes', mensajes)

    /* Escucho los mensajes enviado por el cliente y se los propago a todos */
    socket.on('newMessage', message => {
        const newMessage = {
            email: message.email,
            text: message.text,
            date: getDateTime()
        }
        msgContainer.save(newMessage).then(() =>
            io.sockets.emit('mensajes', mensajes))
    });
})

module.exports = httpServer;