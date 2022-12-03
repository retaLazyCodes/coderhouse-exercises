import { FirebaseBaseRepository } from '../index.js'
import ProductFirebaseDao from '../../dao/product/productsFirebase.dao.js'
import productModel from '../../models/product.model.js'

export class FirebaseProductRepository extends FirebaseBaseRepository {
  constructor () {
    super(ProductFirebaseDao.getInstance(), productModel)
  }
  static getInstance () {
    if (!this.instance) {
      this.instance = new FirebaseProductRepository();
    }
    return this.instance;
  }
}
