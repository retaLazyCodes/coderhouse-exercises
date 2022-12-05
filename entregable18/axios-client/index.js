import axios from "axios";
import { ProductService } from "./Products.js";

const routes = {
  serverAddress: 'http://localhost:8080',
  products: '/api/products',
  carts: '/api/cart'
}

const testProduct = async () => {
  const service = new ProductService(routes.serverAddress, routes.products, axios)
  // {
  //   // get all products
  //   const allProducts = await service.getAll()
  //   const { data, status } = allProducts
  //   console.log(data, status)
  // }
  {
    // create a new product
    const product = {
      name: 'test product',
      description: 'test description',
      code: 'test code',
      price: 300,
      stock: 99,
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFWXx2TsjAu92vq-1EXta4wDMPzOzNdV2mmg&usqp=CAU'
    }
    const newProduct = await service.save(product)
    const { data, status } = newProduct
    console.log(data, status)

    // get product by id
    const productId = data.product.id
    const addedProduct = await service.getById(productId)
    console.log(addedProduct.data)
  }
}

testProduct()
