module.exports = class ProductsService {
  constructor (dao) {
    this.dao = dao;
  }
  getProducts = () => {
    return this.dao.getAll();
  }
  saveProduct = (product) => {
    return this.dao.save(product);
  }
}