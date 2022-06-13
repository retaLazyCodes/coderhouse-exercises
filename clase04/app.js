const express = require('express')
const productsRouter = require('./routes/productos')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api', productsRouter)

module.exports = app;