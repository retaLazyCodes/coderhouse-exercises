const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'mysql'
  }
});

async function createMysqlDB () {
  try {
    knex.raw('CREATE DATABASE IF NOT EXISTS primera_bd;')
      .then(function () {
        console.log('Base de datos MySQL leída/creada correctamente')
      })
      .finally(function () {
        console.log("Done");
      });
  } catch (error) {
    console.log(error)
  }
}

module.exports = { createMysqlDB }