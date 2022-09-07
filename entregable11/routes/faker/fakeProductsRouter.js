const fakeProductsRouter = require('express').Router()
const { generateProduct } = require('./generateProduct')

fakeProductsRouter.get('/productos-test', function (req, res) {
  const products = []

  for (let i = 0; i < 5; i++) {
    const newMessage = generateProduct()
    products.push(newMessage)
  }

  res.render('productList.hbs', { productos: products, layout: 'index' })
})

module.exports = { fakeProductsRouter }
