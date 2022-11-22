const MessageService = require("./message.service")
const MessageDAO = require("../dao/MessageDAO")
const Message = require('../models/Message')
const messageDAO = new MessageDAO(Message)

const ProductsService = require("./product.service")
const ProductDAO = require('../dao/ProductDAO')
const Product = require('../models/Product')
const productDao = new ProductDAO(Product)


const messageService = new MessageService(messageDAO);
const productsService = new ProductsService(productDao);

module.exports = {
  productsService,
  messageService
}