import FirestoreClient from '../../config/db/FirebaseClient.js';
import { BaseFirebaseDao } from '../base/baseFirebase.dao.js';

export default class CartFirebaseDao extends BaseFirebaseDao {
  constructor () {
    super(FirestoreClient.getInstance().connection, 'carts');
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new CartFirebaseDao();
    }
    return this.instance;
  }
}