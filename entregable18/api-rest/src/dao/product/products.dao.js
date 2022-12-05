export default class ProductDaoMemory {
  constructor () {
    this.products = [];
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new ProductDaoMemory();
    }
    return this.instance;
  }

  get = async (id) => {
    if (!id) return this.products;
    const product = this.products.find(p => p.id == id)
    return product !== undefined ? product : null
  }

  create = async (product) => {
    if (this.products.length === 0) product.id = 1;
    else product.id = this.products[this.products.length - 1].id + 1;
    this.products.push(product);
    return product;
  }

  update = async (id, updatedProduct) => {
    const product = this.get(id)
    if (product) {
      const index = this.products.indexOf(product);

      if (index !== -1) {
        this.products[index] = updatedProduct;
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
      }
      return updatedProduct
    }
  }

  delete = async (id) => {
    const product = this.get(id)
    const updatedProducts = this.products.filter(p => p.id !== id)
    this.products = updatedProducts
    return product;
  }

}