import os from 'os';
import cluster from 'cluster';
import express from 'express';

const PORT = process.env.PORT || 8080;
const CPUs = os.cpus().length;
const app = express();

if (process?.argv[2]?.toLowerCase() === "cluster") {

  if (cluster.isPrimary) {
    console.log(`Soy un proceso primario con pid ${process.pid}`)
    for (let i = 0; i < CPUs; i++) {
      cluster.fork();
    }
    cluster.on('message', message => {
      console.log(message);
    })
    cluster.on('exit', worker => {
      console.log(`El proceso hijo con pid ${worker.process.pid} murió :( `)
      cluster.fork();
    })
  }
  else {
    console.log(`Proceso hijo con pid ${process.pid} inicializado`)
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
  }

} else {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
}

app.get('/', (req, res) => {
  console.log(PORT)
  res.send(`El proceso ${process.pid} Ha atendido esta petición `)
})

app.get("/info", (req, res) => {
  console.log(PORT)
  const info = {
    "Argumentos de entrada": process.argv,
    "Plataforma": process.platform,
    "Version de Node": process.version,
    "Memoria reservada": process.memoryUsage(),
    "Path de ejecución": process.title,
    "Process Id": process.pid,
    "Carpeta del proyecto": process.cwd(),
    "Numero de cpus": CPUs
  }
  res.json(info)
})

app.get('/operacion', (req, res) => {
  let result = 0;
  for (let i = 0; i < 5e9; i++) {
    result += i
  }
  res.send(`Proceso con pid ${process.pid} finaliza operación con ${result}`)
})

