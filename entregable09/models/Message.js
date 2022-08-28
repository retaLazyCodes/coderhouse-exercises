const mongoose = require('mongoose')
const { Schema, model } = mongoose

const messageSchema = new Schema({
  email: String,
  nombre: String,
  apellido: String,
  edad: Number,
  alias: String,
  avatar: String,
  text: String,
  date: String,
})

messageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject._id
  }
})

const Message = model('Message', messageSchema)

module.exports = Message 