const mongoose = require('mongoose')
const { Schema, model } = mongoose

const productSchema = new Schema({
  title: String,
  price: Number,
  thumbnail: String,
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject._id
  }
})

const Product = model('Product', productSchema)

module.exports = Product 