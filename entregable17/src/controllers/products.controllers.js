import PersistenceFactory from '../config/Factory.js'

class ProductController {
  constructor () {
    this.service = this.#getPersistenceService()
  }

  #getPersistenceService = () => {
    PersistenceFactory.getPersistence().then((data) => {
      this.service = data.ProductService
    })
  }

  getProducts = async (request, response, next) => {
    try {
      const productId = request.params.id
      if (productId) {
        const product = await this.service.get(productId)
        response.status(200).json({ product, success: true })
      } else {
        const products = await this.service.get()
        response.status(200).json({ products, success: true })
      }
    } catch (error) {
      next(error)
    }
  }

  createProduct = async (request, response, next) => {
    try {
      const { name, price, description, code, stock, thumbnail } = request.body
      const product = {
        name,
        price,
        description,
        code,
        stock,
        thumbnail,
        timestamp: new Date()
      }
      const newProduct = await this.service.create(product)
      response.status(201).json({ product: newProduct, success: true })
    } catch (error) {
      next(error)
    }
  }

  updateProduct = async (request, response, next) => {
    try {
      const productId = request.params.id
      const { name, price, description, code, stock, thumbnail } = request.body
      const product = { name, price, description, code, stock, thumbnail }
      this.service.update(productId, product).then(() => {
        response.status(204).json({ success: true })
      })
        .catch(next)
    } catch (error) {
      next(error)
    }
  }

  deleteProduct = async (request, response, next) => {
    try {
      const productId = request.params.id
      await this.service.delete(productId).then(() => {
        response.status(204).json({ success: true })
      })
        .catch(next)
    } catch (error) {
      next(error)
    }
  }
}

export default new ProductController()
