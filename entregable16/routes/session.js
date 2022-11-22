const sessionRouter = require('express').Router()
const passport = require('passport')
const sessionController = require("../controllers/session.controller")

sessionRouter.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/registerfail' }),
  sessionController.register)

sessionRouter.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/loginfail' }),
  sessionController.login)

sessionRouter.get('/loginfail', sessionController.loginFailed)

sessionRouter.get('/registerfail', sessionController.registerFailed)

sessionRouter.get('/logout', sessionController.logout)

sessionRouter.get('/current', sessionController.getCurrentUser)

module.exports = { sessionRouter }