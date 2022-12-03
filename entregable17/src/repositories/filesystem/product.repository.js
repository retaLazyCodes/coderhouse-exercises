import { FileBaseRepository } from './base.repository.js'
import ProductDaoFile from '../../dao/product/productsFile.dao.js';

export class FileProductRepository extends FileBaseRepository {
  constructor () {
    super(ProductDaoFile.getInstance())
  }
  static getInstance () {
    if (!this.instance) {
      this.instance = new FileProductRepository();
    }
    return this.instance;
  }
}
