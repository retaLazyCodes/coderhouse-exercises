import PersistenceFactory from '../config/Factory.js'

class CartController {
  constructor () {
    this.service = this.#getPersistenceService()
  }

  #getPersistenceService = () => {
    PersistenceFactory.getPersistence().then((data) => {
      this.service = data.CartService
    })
  }

  createCart = async (request, response, next) => {
    try {
      const cart = { timestamp: new Date(), products: [] }
      const cartId = await this.service.create(cart)
      response.status(201).json({ id: cartId, success: true })
    } catch (error) {
      next(error)
    }
  }

  deleteCart = (request, response, next) => {
    try {
      const cartId = request.params.id
      this.service.delete(cartId).then(() => {
        response.status(204).json({ success: true })
      })
        .catch(next)
    } catch (error) {
      next(error)
    }
  }

  getProductsByCartId = async (request, response, next) => {
    try {
      const cartId = request.params.id
      const products = await this.service.getProducts(cartId)
      if (products) {
        response.status(200).json({ products, success: true })
      } else {
        response.status(404).json({ success: false })
      }
    } catch (error) {
      next(error)
    }
  }

  addProductToCart = async (request, response, next) => {
    try {
      const cartId = request.params.id
      const productId = request.params.id_prod
      await this.service.addProduct(cartId, productId)
      response.status(201).json({ success: true })
    } catch (error) {
      next(error)
    }
  }

  deleteProductOfCart = async (request, response, next) => {
    try {
      const cartId = request.params.id
      const productId = request.params.id_prod
      await this.service.deleteProduct(cartId, productId)
      response.status(204).json({ success: true })
    } catch (error) {
      next(error)
    }
  }
}

export default new CartController()
