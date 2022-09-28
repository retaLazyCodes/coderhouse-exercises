import { Router } from "express";
import { fork } from "child_process";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let calculo = fork(__dirname + "/computo.js")

const randomRoute = Router()

var taskId = 0
var tasks = {}

calculo.on("message", function (message) {
  tasks[message.id](message);
})

function addTask (data, callback) {
  var id = taskId++
  calculo.send({ id: id, data: data })
  tasks[id] = callback
}

randomRoute.get('/', async (req, res) => {
  addTask(req.query.cant || 1000000, (randoms) => {
    res.json({ "pid": process.pid, "numeros": randoms })
  })
})

export default randomRoute 