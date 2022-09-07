const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const ProductDAO = require('./controllers/ProductDAO')
const Product = require('./models/Product')
require('./options/mongodb')
require('dotenv').config()

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


/**************** Sessions Config  **************/

const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
  secret: 'foo',
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 600
  }),
  resave: false,
  saveUninitialized: false
}));


/**************** Routers **************/

const productDAO = new ProductDAO(Product);

const { productsRouter } = require('./routes/productos')
app.use('/api', productsRouter)

const { msgRouter, msgDao } = require('./routes/messages')
app.use('/api', msgRouter)

const { fakeProductsRouter } = require('./routes/faker/fakeProductsRouter')
app.use('/api', fakeProductsRouter)

const { sessionRouter } = require('./routes/session')
app.use('/api/sessions', sessionRouter)


/**************** Render views **************/

app.get('/', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('home.hbs', { username: req.session.user.nombre, layout: 'index' })
});

app.get('/login', (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('login.hbs', { layout: 'index' });
})

app.get('/logout', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.render('logout.hbs', { username: req.session.user.nombre, layout: 'index' });
})

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

const util = require("util")
const normalizr = require('normalizr')
const normalize = normalizr.normalize
const schema = normalizr.schema
CHAT_DB = []

/**************** Productos **************/
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


  /**************** Mensajes **************/
  const mensajes = await msgDao.getAll()
  /* Envio los mensajes al cliente que se conectó */
  socket.emit('mensajes', mensajes)

  /* Escucho los mensajes enviado por el cliente y se los propago a todos */
  socket.on('newMessage', async message => {
    const newMessage =
    {
      email: message.email,
      nombre: message.nombre,
      apellido: message.apellido,
      edad: message.edad,
      alias: message.alias,
      avatar: message.avatar,
      text: message.text,
      date: new Date().toLocaleString()
    }
    CHAT_DB.push(newMessage)
    console.log(CHAT_DB)

    fs.promises.writeFile("mensajes.json", JSON.stringify(CHAT_DB)).then(() => {
      console.log("Mensajes de chat guardados en archivo")
    })

    await msgDao.save(newMessage).then(async () => {
      console.log("Mensajes de chat guardados en mongodb")
      const mensajes = await msgDao.getAll()
      io.sockets.emit('mensajes', mensajes)
    })

    const user = new schema.Entity("user", {}, { idAttribute: 'email' })
    const chatSchema = new schema.Entity("author", {
      author: user
    }, { idAttribute: 'email' })

    const normalizedData = normalize(CHAT_DB, [chatSchema])

    console.log(normalizedData)
    console.log(util.inspect(normalizedData, false, 15, true))

    const porc1 = JSON.stringify(CHAT_DB).length
    console.log('longitud chat sin normalizar', porc1)

    const porc2 = JSON.stringify(normalizedData).length
    console.log('longitud chat normalizada', porc2)

    const porcentaje = (porc2 * 100) / porc1
    console.log(`Porcentaje de compresión: ${porcentaje} %`)
  })
})

module.exports = { httpServer };