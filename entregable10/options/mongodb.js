const mongoose = require('mongoose')

const connectionString = 'mongodb://127.0.0.1:27017/chat_db'

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
