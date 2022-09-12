const mongoose = require('mongoose')
require('dotenv').config()

const connectionString = process.env.MONGO_URL

// conexión a mongodb
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB Database connected')
  }).catch(err => {
    console.error('Error trying connect to Database\n', err)
  })

/*
process.on('uncaughtException', () => {
  mongoose.connection.disconnect()
})
*/
