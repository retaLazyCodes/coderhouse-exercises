import { config } from './index.js'
import MongoClient from './db/MongoClient.js'
import FirebaseClient from './db/FirebaseClient.js'
const { PERSISTENCE_SERVICE } = config

export default class PersistenceFactory {
  static getPersistence = async () => {

    const { default: services } = await import('../services/index.js');
    const { CartService, ProductService } = services
    switch (PERSISTENCE_SERVICE) {
      case "MEMORY":
        const { default: ProductDaoMemory } = await import('../dao/product/products.dao.js');
        const { default: CartDaoMemory } = await import('../dao/cart/carts.dao.js');
        const { MemoryProductRepository } = await import('../repositories/memory/product.repository.js')
        const { MemoryCartRepository } = await import('../repositories/memory/cart.repository.js')
        return {
          productsDao: ProductDaoMemory.getInstance(),
          cartsDao: CartDaoMemory.getInstance(),
          productsRepository: MemoryProductRepository.getInstance(),
          cartsRepository: MemoryCartRepository.getInstance(),
          ProductService: ProductService.getInstance(MemoryProductRepository.getInstance()),
          CartService: CartService.getInstance(MemoryCartRepository.getInstance())
        }
      case "FILESYSTEM":
        const { default: CartDaoFile } = await import('../dao/cart/cartsFile.dao.js');
        const { default: ProductDaoFile } = await import('../dao/product/productsFile.dao.js');
        const { FileProductRepository } = await import('../repositories/filesystem/product.repository.js')
        const { FileCartRepository } = await import('../repositories/filesystem/cart.repository.js')
        return {
          productsDao: ProductDaoFile.getInstance(),
          cartsDao: CartDaoFile.getInstance(),
          productsRepository: FileProductRepository.getInstance(),
          cartsRepository: FileCartRepository.getInstance(),
          ProductService: ProductService.getInstance(FileProductRepository.getInstance()),
          CartService: CartService.getInstance(FileCartRepository.getInstance()),
        }
      case "MONGO":
        MongoClient.getInstance();
        const { default: ProductMongoDao } = await import('../dao/product/productsMongo.dao.js');
        const { default: CartMongoDao } = await import('../dao/cart/cartsMongo.dao.js');
        const { MongoProductRepository } = await import('../repositories/mongodb/product.repository.js')
        const { MongoCartRepository } = await import('../repositories/mongodb/cart.repository.js')
        return {
          productsDao: ProductMongoDao.getInstance(),
          cartsDao: CartMongoDao.getInstance(),
          productsRepository: MongoProductRepository.getInstance(),
          cartsRepository: MongoCartRepository.getInstance(),
          ProductService: ProductService.getInstance(MongoProductRepository.getInstance()),
          CartService: CartService.getInstance(MongoCartRepository.getInstance()),
        }
      case "FIREBASE":
        FirebaseClient.getInstance();
        const { default: ProductFirebaseDao } = await import('../dao/product/productsFirebase.dao.js');
        const { default: CartFirebaseDao } = await import('../dao/cart/cartsFirebase.dao.js');
        const { FirebaseProductRepository } = await import('../repositories/firebase/product.repository.js')
        const { FirebaseCartRepository } = await import('../repositories/firebase/cart.repository.js')
        return {
          productsDao: ProductFirebaseDao.getInstance(),
          cartsDao: CartFirebaseDao.getInstance(),
          productsRepository: FirebaseProductRepository.getInstance(),
          cartsRepository: FirebaseCartRepository.getInstance(),
          ProductService: ProductService.getInstance(FirebaseProductRepository.getInstance()),
          CartService: CartService.getInstance(FirebaseCartRepository.getInstance()),
        }
      default:
        throw new Error(`Unknown persistence service: ${PERSISTENCE_SERVICE}`)
    }
  }
}