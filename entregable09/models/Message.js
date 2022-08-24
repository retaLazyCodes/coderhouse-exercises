const mongoose = require('mongoose')
const { Schema, model } = mongoose

const messageSchema = new Schema({
  author: {
    type: Schema.Types.Mixed, required: true
  },
  text: String,
  date: String,
})

messageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

const Message = model('Message', messageSchema)

module.exports = Message 