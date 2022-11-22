module.exports = class MessageDAO {
  constructor (model) {
    this.model = model
  }

  async save (msj) {
    return await this.model.create(msj)
  }

  async getAll () {
    return await this.model.find().lean()
  }

}
