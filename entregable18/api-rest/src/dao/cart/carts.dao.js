export default class CartDaoMemory {
  constructor () {
    this.carts = [];
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new CartDaoMemory();
    }
    return this.instance;
  }

  get = async (id) => {
    if (!id) return this.carts;
    const cart = this.carts.find(p => p.id == parseInt(id))
    return cart !== undefined ? cart : null
  }

  create = async (cart) => {
    if (this.carts.length === 0) cart.id = 1;
    else cart.id = this.carts[this.carts.length - 1].id + 1;
    this.carts.push(cart);
    return cart;
  }

  update = async (id, updatedCart) => {
    const cart = this.get(id)
    if (cart) {
      const index = this.carts.indexOf(cart);

      if (index !== -1) {
        this.carts[index] = updatedCart;
      }
      return updatedCart
    }
  }

  delete = async (id) => {
    const cart = this.get(id)
    const updatedCarts = this.carts.filter(p => p.id !== parseInt(id))
    this.carts = updatedCarts
    return cart;
  }

}