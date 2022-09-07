const sessionRouter = require('express').Router()
const passport = require('passport')

sessionRouter.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/registerfail' }), async (req, res) => {
  res.send({ status: "success", payload: req.user._id })
})

sessionRouter.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/loginfail' }), async (req, res) => {
  req.session.user = {
    name: req.user.name,
    email: req.user.email,
    id: req.user._id
  }
  res.send({ status: "success", payload: req.user._id })
})

sessionRouter.get('/loginfail', (req, res) => {
  console.log("login failed");
  res.send({ status: "error", error: "Login failed" })
})

sessionRouter.get('/registerfail', async (req, res) => {
  console.log("Register failed");
  res.status(500).send({ status: "error", error: "Register failed" })
})

sessionRouter.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send({ error: err })
    res.send({ message: "Logout successful" })
  })
})

sessionRouter.get('/current', (req, res) => {
  res.send(req.session.user);
})

module.exports = { sessionRouter }