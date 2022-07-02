const msgRouter = require('express').Router()
const MessageContainer = require('../controllers/MessageContainer')

const msgContainer = new MessageContainer('messages')

msgRouter.get('/mensajes', function (req, res) {
    const messages = msgContainer.getAll()
    res.json(messages);
})

// msgRouter.post('/mensajes', function (req, res) {
//     console.log(req.body)
//     const { email, text } = req.body
//     const newMessage = { email, text }
//     console.log("req.body", req.body)
//     container.save(newMessage)
//     res.redirect('/productos')
// })

module.exports = { msgRouter, msgContainer }
