const msgRouter = require('express').Router()
const MessageDAO = require('../controllers/MessageDAO')
const { Messege } = require('../models/Message')

const msgDao = new MessageDAO(Messege);

msgRouter.get('/mensajes', async function (req, res) {
  const messages = await msgDao.getAll()
  res.json(messages);
})

module.exports = { msgRouter, msgDao }
