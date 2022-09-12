const bcrypt = require('bcrypt')

/* Bcrypts */
const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

module.exports = {
  __dirname,
  createHash,
  isValidPassword
}