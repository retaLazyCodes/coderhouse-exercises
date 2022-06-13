const router = require('express').Router()
const Container = require('../controllers/Container')
const Product = require('../models/Product')

const container = new Container()

router.get('/productos', function (req, res) {
    const products = container.getAll()
    res.json(products);
})

router.get('/productos/:id', function (req, res) {
    const { id } = req.params
    const product = container.getById(id)
    if (product != null) {
        res.end(JSON.stringify((product)))
    }
    res.status(404).json({ error: 'producto no encontrado' })
})

router.post('/productos', function (req, res) {
    const { title, price, thumbnail } = req.body
    const newProduct = new Product(title, price, thumbnail)
    console.log("req.body", req.body)
    const lastProductId = container.save(newProduct)
    res.json(lastProductId)
})

router.put('/productos/:id', function (req, res) {
    const { id } = req.params
    const { title, price, thumbnail } = req.body
    const product = new Product(title, price, thumbnail)

    container.updateById(id, product)
    res.status(204).json({ success: 'producto actualizado' })
})

router.delete('/productos/:id', function (req, res) {
    const { id } = req.params
    const product = container.deleteById(id)
    if (product != null) {
        res.end(JSON.stringify((product)))
    }
    res.end(JSON.stringify(({ error: 'producto no encontrado' })))
})

module.exports = router;