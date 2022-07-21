const { httpServer } = require('./app')

const port = 8080

httpServer.listen(port, () => {
  console.log(`Express server listening on: \nhttp://localhost:${port}\nhttp://localhost:${port}/api/productos`)
})
