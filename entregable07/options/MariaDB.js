const mysqlOptions = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'primera_bd'
  }
}

module.exports = { mysqlOptions }