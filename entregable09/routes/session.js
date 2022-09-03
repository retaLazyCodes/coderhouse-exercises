const sessionRouter = require('express').Router()

sessionRouter.post('/login', (req, res) => {
  const { nombre } = req.body
  console.log(nombre)
  req.session.user = {
    nombre,
    role: "admin"
  }
  res.send({ message: "Login successful" })
})

sessionRouter.get('/current', (req, res) => {
  res.send(req.session.user);
})

sessionRouter.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send({ error: err })
    res.send({ message: "Logout successful" })
  })
})

module.exports = { sessionRouter }