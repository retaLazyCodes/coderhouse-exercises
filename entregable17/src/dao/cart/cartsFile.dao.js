import __dirname from "../../utils.js";
import fs from 'fs';

export default class CartDaoFile {
  constructor () {
    this.path = __dirname + '/files/carts.json';
    this.init();
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new CartDaoFile();
    }
    return this.instance;
  }

  init = async () => {
    if (!fs.existsSync(this.path)) await fs.promises.writeFile(this.path, JSON.stringify([]))
  }

  readFile = async () => {
    let data = await fs.promises.readFile(this.path, 'utf-8');
    return JSON.parse(data);
  }

  get = async (id) => {
    const carts = await this.readFile();
    if (!id) return carts;
    const cart = carts.find(p => p.id == parseInt(id))
    return cart !== undefined ? cart : null
  }

  create = async (cart) => {
    try {
      const carts = await this.readFile();
      if (carts.length === 0) cart.id = 1;
      else cart.id = carts[carts.length - 1].id + 1;
      carts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
      return cart;
    } catch (error) {
      throw new Error("Error writing new cart")
    }
  }

  update = async (id, updatedCart) => {
    const carts = await this.readFile();
    const cart = await this.get(id)
    console.log(cart)
    if (cart) {
      const index = carts.findIndex(c => {
        return parseInt(c.id) === parseInt(cart.id)
      });
      console.log(carts)
      console.log(index)
      if (index !== -1) {
        carts[index] = updatedCart;
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
      }
      return updatedCart
    }
  }

  delete = async (id) => {
    const carts = await this.readFile();
    const cart = this.get(id)
    const updatedCarts = carts.filter(p => parseInt(p.id) !== parseInt(id))
    await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts, null, '\t'));
    return cart;
  }

}