const msgRouter = require('express').Router()
const messageController = require('../controllers/messages.controller')

msgRouter.get('/', messageController.getAllMessages)
msgRouter.post('/', messageController.saveMessage)

module.exports = { msgRouter }
