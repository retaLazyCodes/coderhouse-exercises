import { MemoryBaseRepository } from './base.repository.js'
import ProductDaoMemory from '../../dao/product/products.dao.js';

export class MemoryProductRepository extends MemoryBaseRepository {
  constructor () {
    super(ProductDaoMemory.getInstance())
  }
  static getInstance () {
    if (!this.instance) {
      this.instance = new MemoryProductRepository();
    }
    return this.instance;
  }
}
