module.exports = class ProductDAO {
  constructor (model) {
    this.model = model
  }

  async save (prod) {
    return await this.model.create(prod)
  }

  async getAll () {
    return await this.model.find().lean()
  }

}
