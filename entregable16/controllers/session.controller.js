const register = async (req, res) => {
  res.send({ status: "success", payload: req.user._id })
}

const login = async (req, res) => {
  req.session.user = {
    name: req.user.name,
    email: req.user.email,
    id: req.user._id
  }
  res.send({ status: "success", payload: req.user._id })
}

const loginFailed = async (req, res) => {
  res.send({ status: "error", error: "Login failed" })
}

const registerFailed = async (req, res) => {
  res.status(500).send({ status: "error", error: "Register failed" })
}

const logout = async (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send({ error: err })
    res.send({ message: "Logout successful" })
  })
}

const getCurrentUser = async (req, res) => {
  res.send(req.session.user);
}

module.exports = {
  register,
  registerFailed,
  login,
  loginFailed,
  logout,
  getCurrentUser
}