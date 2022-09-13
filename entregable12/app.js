const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const ProductDAO = require('./controllers/ProductDAO')
const Product = require('./models/Product')
require('./options/mongodb')
const passport = require('passport')
const initializePassport = require('./config/passport.config.js')
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
  secret: process.env.SECRET_SESSION,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 600
  }),
  resave: false,
  saveUninitialized: false
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

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

const { infoRouter } = require('./routes/info')
app.use('/info', infoRouter)

const { randomRouter } = require('./routes/random')
app.use('/api/randoms', randomRouter)

const { viewsRouter } = require('./routes/views')
app.use('/', viewsRouter)


/**************** Socket.io **************/

const util = require("util")
const fs = require('fs')
const normalizr = require('normalizr')
const normalize = normalizr.normalize
const denormalize = normalizr.denormalize
const schema = normalizr.schema
let CHAT_DB = { id: "mensajes", mensajes: [] }

if (fs.existsSync('./mensajes.json')) {
  data = fs.readFileSync('./mensajes.json',
    { encoding: 'utf8', flag: 'r' });
  CHAT_DB = JSON.parse(data)
}
console.log(CHAT_DB)

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
  socket.emit('mensajes', CHAT_DB)

  /* Escucho los mensajes enviado por el cliente y se los propago a todos */
  socket.on('newMessage', async message => {
    const newMessage =
    {
      author: {
        email: message.email,
        nombre: message.nombre,
        apellido: message.apellido,
        edad: message.edad,
        alias: message.alias,
        avatar: message.avatar,
      },
      text: message.text,
      date: new Date().toLocaleString()
    }
    CHAT_DB.mensajes.push(newMessage)
    console.log(CHAT_DB)

    fs.promises.writeFile("mensajes.json", JSON.stringify(CHAT_DB)).then(() => {
      console.log("Mensajes de chat guardados en archivo")
    })

    await msgDao.save(newMessage).then(async () => {
      console.log("Mensajes de chat guardados en mongodb")
    })

    const authorSchema = new schema.Entity("author", {}, { idAttribute: 'email' })
    const messageSchema = new schema.Entity(
      "post",
      {
        author: authorSchema
      },
      { idAttribute: (value) => 123 }
    )

    const normalizedData = normalize(CHAT_DB.mensajes, [messageSchema])

    console.log(normalizedData)
    console.log(util.inspect(normalizedData, false, 15, true))

    let msg = denormalize(
      normalizedData.result,
      [messageSchema],
      normalizedData.entities
    );
    console.log("Denormalizado: ", msg)

    const porc1 = JSON.stringify(CHAT_DB).length
    console.log('longitud chat sin normalizar', porc1)

    const porc2 = JSON.stringify(normalizedData).length
    console.log('longitud chat normalizada', porc2)

    const porcentaje = (porc2 * 100) / porc1
    console.log(`Porcentaje de compresión: ${porcentaje} %`)

    io.sockets.emit('mensajes', CHAT_DB)

  })
})

module.exports = { httpServer };