import { FileBaseRepository } from './base.repository.js'
import { FileProductRepository } from './product.repository.js'
import CartDaoFile from '../../dao/cart/cartsFile.dao.js'

export class FileCartRepository extends FileBaseRepository {
  constructor () {
    super(CartDaoFile.getInstance())
    this.dao = CartDaoFile.getInstance()
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new FileCartRepository();
    }
    return this.instance;
  }

  async getProducts (id) {
    return await this.dao.get(id).then((cart) => {
      return cart?.products ? cart.products : []
    })
  }

  async addProduct (id, productId) {
    const { cart, product } = await this.#getCartAndProduct(id, productId)
    cart.products.push(product)
    const filter = id
    return await this.dao.update(filter, cart)
  }

  async deleteProduct (id, productId) {
    const { cart } = await this.#getCartAndProduct(id, productId)
    const filteredProducts = cart.products.filter(product => {
      return product.id !== productId
    })
    const filter = id
    const update = { products: filteredProducts }
    return await this.dao.update(filter, update)
  }

  async #getCartAndProduct (id, productId) {
    const cart = await this.dao.get(id)
    if (!cart) {
      throw new Error('Cart not found')
    }
    const productRepository = FileProductRepository.getInstance()
    const product = await productRepository.get(productId)
    if (!product) {
      throw new Error('Product not found')
    }
    return { cart, product }
  }
}
