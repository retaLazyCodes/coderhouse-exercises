const knexLib = require('knex')
const Product = require('../models/Product')

module.exports = class ProductDAO {
  constructor (config, tablename) {
    this.knex = knexLib(config)
    this.tablename = tablename
  }

  createTable () {
    return this.knex.schema.createTableIfNotExists(this.tablename, table => {
      table.increments('id').primary();
      table.string('title', 50).notNullable();
      table.float('price', 10).notNullable();
      table.string('thumbnail');
    })
  }

  async save (product) {
    if (product instanceof Product === false) {
      console.log('el parametro no es de tipo Product')
      return
    }
    return await this.knex(this.tablename).insert(product, ['id'])
  }

  async getById (id) {
    const product = await this.knex(this.tablename).where({ id: id }).first()
    return product !== undefined ? product : null
  }

  async getAll () {
    const result = await this.knex(this.tablename).select('*')
    return JSON.parse(JSON.stringify(result))
  }

  async deleteById (id) {
    return await this.knex(this.tablename).from(this.tablename).where('id', id).del()
  }

  async updateById (id, product) {
    return await this.knex.from(this.tablename).where('id', id).update({ product: product })
  }

  close () {
    this.knex.destroy();
  }
}
