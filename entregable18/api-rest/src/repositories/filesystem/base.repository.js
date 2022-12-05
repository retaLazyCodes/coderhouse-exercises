import productDTO from "../../dto/productDTO.js"

export class FileBaseRepository {
  constructor (dao) {
    this.dao = dao
  }

  async get (id) {
    if (!id) {
      const products = await this.dao.get()
      if (products) return productDTO.productSimplified(products)
      else return {}
    }
    return await this.dao.get(id)
  }

  async create (entity) {
    return await this.dao.create(entity)
  }

  async update (id, entity) {
    return await this.dao.update(id, entity)
  }

  async delete (id) {
    await this.dao.delete(id)
    return true
  }
}
