const { httpServer } = require('./app')
const argv = require('./config/yargs.config')
const port = argv.PORT

httpServer.listen(port, () => {
  console.log(`Express server listening on: \nhttp://localhost:${port}\nhttp://localhost:${port}/api/productos\nhttp://localhost:${port}/api/productos-test`)
})
