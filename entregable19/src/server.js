import express from "express";
import session from 'express-session';
import mongoStore from 'connect-mongo';
import logger from "./utils/loggers/Log4jsLogger.js";
import loggerMiddleware from "./middlewares/routesLogger.middleware.js";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/Schema.js";
import { CarritoService } from "./services/carrito.service.js";
import { ProductoService } from "./services/producto.service.js";

const app = express();

app.use(loggerMiddleware);
// app.set('views', './src/views');
// app.set('view engine', 'hbs');

// app.engine('hbs', engine({
//     extname: '.hbs',
//     defaultLayout: 'index.hbs',
//     layoutsDir: __dirname + '/views/layouts',
//     partialsDir: __dirname + '/views/partials'
// }))

app.use(
  session({
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      options: {
        userNewParser: true,
        useUnifiedTopology: true,
      }
    }),
    secret: 'foo',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 } //10 min.

  }))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function getAllCarritos () {
  return CarritoService.getInstance().getAll();
}

async function getAllProductos () {
  return ProductoService.getInstance().getAll();
}

async function createCarrito () {
  return CarritoService.getInstance().create();
}

async function deleteCarritoById ({ id }) {
  return CarritoService.getInstance().deleteById(id);
}

async function getAllProductsFromCartById ({ id }) {
  return CarritoService.getInstance().getAllProductsFromCart(id);
}

async function saveProductToCart ({ id, idProd }) {
  return CarritoService.getInstance().saveProductToCart(id, idProd);
}

async function deleteProductFromCart ({ id, idProd }) {
  return CarritoService.getInstance().deleteProductFromCart(id, idProd);
}

async function getProductById ({ id }) {
  return ProductoService.getInstance().getProductById(id);
}

async function createProduct ({ data }) {
  return ProductoService.getInstance().create(data);
}

async function updateProductById ({ id, data }) {
  return ProductoService.getInstance().updateProductById(id, data);
}

async function deleteProductById ({ id }) {
  return ProductoService.getInstance().deleteById(id);
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: {
      getAllCarritos,
      getAllProductos,
      createCarrito,
      deleteCarritoById,
      getAllProductsFromCartById,
      saveProductToCart,
      deleteProductFromCart,
      getProductById,
      createProduct,
      updateProductById,
      deleteProductById
    },
    graphiql: true
  }
  )
);

app.all("*", (req, res) => {
  res.status(404).json({ "error": "ruta no existente" })
});

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server started at http://localhost:${PORT}/graphql`)
})

server.on('error', (err) => logger.error(err));

