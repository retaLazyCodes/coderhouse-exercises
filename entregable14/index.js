import os from 'os';
import cluster from 'cluster'
import express from 'express';
import compression from 'compression';
import { logger } from './utils.js';

const PORT = parseInt(process.argv[2]) || 8080
const modoCluster = process.argv[3] == 'CLUSTER'
const numCPUs = os.cpus().length


if (modoCluster && cluster.isPrimary) {

  console.log(`Número de procesadores: ${numCPUs}`)
  console.log(`PID MASTER ${process.pid}`)

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', worker => {
    console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
    cluster.fork()
  })
} else {

  const app = express()
  // app.use(compression())
  app.use(logger());

  app.use((req, res, next) => {
    req.logger.info('ruta: ' + req.originalUrl + ' metodo: ' + req.method);
    next();
  })

  app.get('/', (req, res) => {
    const primes = []
    const max = Number(req.query.max) || 1000
    for (let i = 1; i <= max; i++) {
      if (isPrime(i)) primes.push(i)
    }
    res.json(primes)
  })

  app.get("/info", (req, res) => {
    const info = {
      "Argumentos de entrada": process.argv,
      "Plataforma": process.platform,
      "Version de Node": process.version,
      "Memoria reservada": process.memoryUsage(),
      "Path de ejecución": process.title,
      "Process Id": process.pid,
      "Carpeta del proyecto": process.cwd(),
      "Numero de cpus": numCPUs
    }
    console.log(info)
    res.json(info)
  })

  app.use((req, res, next) => {
    req.logger.warn('ruta: ' + req.originalUrl + ' metodo: ' + req.method + ' no implementada');
    return res.status(401).json(
      {
        error: -2,
        descripcion: 'ruta: ' + req.originalUrl + ' metodo: ' + req.method + ' no implementada'
      })
  })

  app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
    console.log(`PID WORKER ${process.pid}`)
  })
}

function isPrime (num) {
  if ([2, 3].includes(num)) return true;
  else if ([2, 3].some(n => num % n == 0)) return false;
  else {
    let i = 5, w = 2;
    while ((i ** 2) <= num) {
      if (num % i == 0) return false
      i += w
      w = 6 - w
    }
  }
  return true
}



