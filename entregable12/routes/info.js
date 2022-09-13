const infoRouter = require('express').Router()

infoRouter.get('/', function (req, res) {
  const info = {
    "Argumentos de entrada": process.argv,
    "Plataforma": process.platform,
    "Version de Node": process.version,
    "Memoria reservada": process.memoryUsage(),
    "Path de ejecución": process.title,
    "Process Id": process.pid,
    "Carpeta del proyecto": process.cwd()
  }
  res.json(info)
})

module.exports = { infoRouter }
