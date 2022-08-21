const msgRouter = require('express').Router()
const MessageDAO = require('../controllers/MessageDAO')
const { sqliteOptions } = require('../options/SQlite')

const msgDao = new MessageDAO(sqliteOptions, 'mensajes');

msgRouter.get('/mensajes', async function (req, res) {
  const messages = await msgDao.getAll()
  res.json(messages);
})

module.exports = { msgRouter, msgDao }
