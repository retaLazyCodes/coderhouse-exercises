const router = require('express').Router()
const ProductDAO = require('../controllers/ProductDAO')
const Product = require('../models/Product')
const { mysqlOptions } = require('../options/MariaDB')

const productDAO = new ProductDAO(mysqlOptions, 'productos')

router.get('/productos', async function (req, res) {
  const products = await productDAO.getAll()
  res.json(products);
})

router.get('/productos/:id', async function (req, res) {
  const { id } = req.params
  const product = await productDAO.getById(id)
  if (product != null) {
    res.end(JSON.stringify((product)))
  }
  res.status(404).json({ error: 'producto no encontrado' })
})

router.post('/productos', async function (req, res) {
  console.log(req.body)
  const { title, price, thumbnail } = req.body
  const newProduct = new Product(title, price, thumbnail)
  console.log("req.body", req.body)
  const lastProductId = await productDAO.save(newProduct)
  res.redirect('/productos')
})

router.put('/productos/:id', async function (req, res) {
  const { id } = req.params
  const { title, price, thumbnail } = req.body
  const product = new Product(title, price, thumbnail)

  await productDAO.updateById(id, product)
  res.status(204).json({ success: 'producto actualizado' })
})

router.delete('/productos/:id', async function (req, res) {
  const { id } = req.params
  const product = await productDAO.deleteById(id)
  if (product != null) {
    res.end(JSON.stringify((product)))
  }
  res.end(JSON.stringify(({ error: 'producto no encontrado' })))
})

module.exports = { router };