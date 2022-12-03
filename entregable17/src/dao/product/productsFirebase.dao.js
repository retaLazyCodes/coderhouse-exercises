import FirestoreClient from '../../config/db/FirebaseClient.js';
import { BaseFirebaseDao } from '../base/baseFirebase.dao.js';

export default class ProductFirebaseDao extends BaseFirebaseDao {
  constructor () {
    super(FirestoreClient.getInstance().connection, 'products');
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new ProductFirebaseDao();
    }
    return this.instance;
  }
}