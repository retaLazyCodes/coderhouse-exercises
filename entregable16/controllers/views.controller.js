const fs = require('fs')
const dirname = require('../utils').__dirname
const { productsService } = require("../services/index")

const renderHome = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('home.hbs', { username: req.session.user.name, email: req.session.user.email, layout: 'index' })
}

const renderLogin = async (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('login.hbs', { layout: 'index' });
}

const renderLogout = async (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.render('logout.hbs', { username: req.session.user.name, layout: 'index' });
}

const renderRegister = async (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('register.hbs', { layout: 'index' });
}

const renderProductos = async (req, res) => {
  const productos = await productsService.getProducts()
  res.render('productList.hbs', { productos: productos, layout: 'index' })
}

const renderRegisterFail = async (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('registerfail.hbs', { layout: 'index' })
}

const renderLoginFail = async (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('loginfail.hbs', { layout: 'index' })
}

const getProductsTemplate = async (req, res) => {
  fs.readFile(dirname + '/views/productList.hbs', 'utf8', (error, data) => {
    if (error) {
      throw error;
    }
    res.send(data.toString())
  });
}

const getMessagesTemplate = async (req, res) => {
  fs.readFile(dirname + '/views/chat.hbs', 'utf8', (error, data) => {
    if (error) {
      throw error;
    }
    res.send(data.toString())
  });
}

module.exports = {
  renderHome,
  renderLogin,
  renderLoginFail,
  renderLogout,
  renderRegister,
  renderRegisterFail,
  renderProductos,
  getProductsTemplate,
  getMessagesTemplate
}