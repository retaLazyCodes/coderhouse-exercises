import __dirname from "../../utils.js";
import fs from 'fs';

export default class ProductDaoFile {
  constructor () {
    this.path = __dirname + '/files/products.json';
    this.init();
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new ProductDaoFile();
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
    const products = await this.readFile();
    if (!id) return products;
    const product = products.find(p => p.id == id)
    return product !== undefined ? product : null
  }

  create = async (product) => {
    console.log(product)
    try {
      const products = await this.readFile();
      if (products.length === 0) product.id = 1;
      else product.id = products[products.length - 1].id + 1;
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
      console.log(product)
      return product;
    } catch (error) {
      throw new Error("Error writing new product")
    }
  }

  update = async (id, updatedProduct) => {
    const products = await this.readFile();
    const product = this.get(id)
    if (product) {
      const index = products.indexOf(product);

      if (index !== -1) {
        products[index] = updatedProduct;
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
      }
      return updatedProduct
    }
  }

  delete = async (id) => {
    const products = await this.readFile();
    const product = this.get(id)
    const updatedProducts = products.filter(p => p.id !== id)
    await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, '\t'));
    return product;
  }

}