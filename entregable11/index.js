const { httpServer } = require('./app')

const port = process.env.PORT || 8080

httpServer.listen(port, () => {
  console.log(`Express server listening on: \nhttp://localhost:${port}\nhttp://localhost:${port}/api/productos\nhttp://localhost:${port}/api/productos-test`)
})
