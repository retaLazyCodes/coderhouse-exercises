const viewsRouter = require('express').Router()
const viewsController = require("../controllers/views.controller")

viewsRouter.get('/', viewsController.renderHome);

viewsRouter.get('/login', viewsController.renderLogin)

viewsRouter.get('/logout', viewsController.renderLogout)

viewsRouter.get('/register', viewsController.renderRegister)

viewsRouter.get('/productos', viewsController.renderProductos)

viewsRouter.get('/registerfail', viewsController.renderRegisterFail)

viewsRouter.get('/loginfail', viewsController.renderLoginFail)

viewsRouter.get('/productos/template', viewsController.getProductsTemplate)

viewsRouter.get('/mensajes/template', viewsController.getMessagesTemplate)

module.exports = { viewsRouter }