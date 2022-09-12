const viewsRouter = require('express').Router()
const fs = require('fs')
const ProductDAO = require('../controllers/ProductDAO')
const Product = require('../models/Product')
const dirname = require('../utils').__dirname
const productDAO = new ProductDAO(Product)

viewsRouter.get('/', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('home.hbs', { username: req.session.user.name, email: req.session.user.email, layout: 'index' })
});

viewsRouter.get('/login', (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('login.hbs', { layout: 'index' });
})

viewsRouter.get('/logout', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.render('logout.hbs', { username: req.session.user.name, layout: 'index' });
})

viewsRouter.get('/register', (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('register.hbs', { layout: 'index' });
})

viewsRouter.get('/productos', async (req, res) => {
  const productos = await productDAO.getAll()
  console.log(productos)
  res.render('productList.hbs', { productos: productos, layout: 'index' })
})

viewsRouter.get('/registerfail', async (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('registerfail.hbs', { layout: 'index' })
})

viewsRouter.get('/loginfail', async (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('loginfail.hbs', { layout: 'index' })
})

viewsRouter.get('/productos/template', async (req, res) => {
  fs.readFile(dirname + '/views/productList.hbs', 'utf8', (error, data) => {
    if (error) {
      throw error;
    }
    res.send(data.toString())
  });
});

viewsRouter.get('/mensajes/template', async (req, res) => {
  fs.readFile(dirname + '/views/chat.hbs', 'utf8', (error, data) => {
    if (error) {
      throw error;
    }
    res.send(data.toString())
  });
});

module.exports = { viewsRouter }