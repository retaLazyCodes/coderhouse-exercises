const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const ProductDAO = require('./controllers/ProductDAO')
const { createMysqlDB } = require('./options/createMysqlDB')
const { mysqlOptions } = require('./options/MariaDB')
require('./options/mongodb')

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

const productDAO = new ProductDAO(mysqlOptions, 'productos');

(async () => {
  await createMysqlDB()
  await productDAO.createTable()
})();

const { router } = require('./routes/productos')
app.use('/api', router)

const { msgRouter, msgDao } = require('./routes/messages')
app.use('/api', msgRouter)

const { fakeProductsRouter } = require('./routes/faker/fakeProductsRouter')
app.use('/api', fakeProductsRouter)



/**************** Render views **************/

app.get('/productos', async (req, res) => {
  const productos = await productDAO.getAll()
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



/**************** Socket.io **************/

io.on('connection', async socket => {
  console.log('Nuevo cliente conectado!')

  /* Envio los productos al cliente que se conectó */
  const productos = await productDAO.getAll()
  socket.emit('productos', productos)

  /* Escucho el producto enviado por el cliente y se los propago a todos */
  socket.on('newProduct', async data => {
    const productos = await productDAO.getAll()
    io.sockets.emit('productos', productos)
  });


  const mensajes = await msgDao.getAll()
  /* Envio los mensajes al cliente que se conectó */
  socket.emit('mensajes', mensajes)

  /* Escucho los mensajes enviado por el cliente y se los propago a todos */
  socket.on('newMessage', async message => {
    const newMessage = 
    {
      author: {
        id: message.email,
        nombre: message.nombre,
        apellido: message.apellido,
        edad: message.edad,
        alias: message.alias,
        avatar: message.avatar,
      },
      text: message.text,
      date: new Date().toLocaleString()
    }
    await msgDao.save(newMessage).then(async () => {
      const mensajes = await msgDao.getAll()
      io.sockets.emit('mensajes', mensajes)
    })
  });
})

module.exports = { HttpServer }


module.exports = { httpServer };