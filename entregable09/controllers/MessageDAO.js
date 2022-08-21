const knexLib = require('knex')

module.exports = class MessageDAO {
  constructor (config, tablename) {
    this.knex = knexLib(config)
    this.tablename = tablename
  }

  createTable () {
    return this.knex.schema.createTableIfNotExists(this.tablename, table => {
      table.increments('id').primary();
      table.string('email', 50).notNullable();
      table.string('date', 10).notNullable();
      table.string('text');
    })
  }

  async save (msj) {
    await this.knex(this.tablename).insert(msj, ['id'])
  }

  async getAll () {
    const result = await this.knex(this.tablename).select('*')
    return JSON.parse(JSON.stringify(result))
  }

  close () {
    this.knex.destroy();
  }
}
