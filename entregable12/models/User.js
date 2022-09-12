const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject._id
  }
})

const User = model('User', userSchema)

module.exports = User 