const randomRouter = require('express').Router()
const { fork } = require('child_process')
const dirname = require('../utils').__dirname

let calculo = fork(dirname + "/computo.js")

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


randomRouter.get("/", async (req, res) => {
  addTask(req.query.cant || 1000000000, (randoms) => {
    res.json(randoms)
  })
})

module.exports = { randomRouter }
