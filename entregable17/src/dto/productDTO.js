const productSimplified = (products) => {
  const productsDTO = []

  if (products?.length) {
    products.map((product) => {
      const prod = {
        id: product?.id ? product.id : product._id,
        name: product.name,
        price: product.price,
        thumbnail: product.thumbnail,
      }
      productsDTO.push(prod)
    })
    return productsDTO
  }
  return {
    id: product?.id ? product.id : product._id,
    name: products.name,
    price: products.price,
    thumbnail: products.thumbnail,
  }

}

export default { productSimplified }