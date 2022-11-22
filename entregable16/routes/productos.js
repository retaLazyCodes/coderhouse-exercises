const productsRouter = require('express').Router()
const productsController = require('../controllers/products.controller')

productsRouter.get('/', productsController.getAllProducts)
productsRouter.post('/', productsController.saveProduct)

module.exports = { productsRouter };