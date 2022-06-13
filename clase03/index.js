const express = require('express')
const Container = require('./Container')

const app = express()
const port = 8080

const container = new Container()

app.get('/productos', async (req, res) => {
    const products = await container.getAll()
    res.send(products)
})

app.get('/productoRandom', async (req, res) => {
    const rndInt = Math.floor(Math.random() * 5) + 1
    console.log(`Searching product with id ${rndInt} ...`)
    const product = await container.getById(rndInt)
    if (product !== null) {
        res.send(product)
    }
    else {
        res.status(404).send(`Product with id ${rndInt} not found`)
    }
})

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
})
