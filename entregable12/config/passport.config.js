const passport = require('passport')
const local = require('passport-local')
const User = require('../models/User')
const { createHash, isValidPassword } = require('../utils')


const LocalStrategy = local.Strategy; //local = username + password

const initializePassport = () => {

  passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
    try {
      const { name } = req.body;
      if (!name || !email || !password) return done(null, false);
      let exists = await User.findOne({ email: email });
      if (exists) return done(null, false);
      let result = await User.create({
        name,
        email,
        password: createHash(password)
      })
      //SI TODO SALIÓ BIEN
      return done(null, result)
    }
    catch (error) {
      return done(error);
    }
  }))

  passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      if (!email || !password) return done(null, false);
      let user = await User.findOne({ email: email });
      console.log(user)
      if (!user) return done(null, false);
      if (!isValidPassword(user, password)) return done(null, false);
      return done(null, user)
    } catch (error) {
      console.log(error);
      return done(error);
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser(async (id, done) => {
    let result = await User.findOne({ _id: id })
    return done(null, result);
  })
}

module.exports = initializePassport
