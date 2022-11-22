const { productsService } = require("../services/index")

const getAllProducts = async (req, res) => {
  try {
    let products = await productsService.getProducts();
    res.send({ status: "success", payload: products })
  } catch (error) {
    console.log(error);
    res.send({ status: "error", error: error })
  }
}
const saveProduct = async (req, res) => {
  try {
    const { title, price, thumbnail } = req.body
    if (!title || !price || !thumbnail) return res.status(400).send({ status: "error", error: "Incomplete values" });
    const newProduct = { title, price, thumbnail }
    const result = await productsService.saveProduct(newProduct);
    res.redirect('/productos')
  } catch (error) {
    console.log(error);
    res.send({ status: "error", error: error })
  }
}

module.exports = {
  getAllProducts,
  saveProduct,
}