const Product = require('../models/Product');

module.exports = class Container {
    constructor() {
        this.products = []
    }

    static count = 0

    save(product) {
        if (product instanceof Product === false) {
            console.log('el parametro no es de tipo Product')
            return
        }
        Container.count++
        product.id = Container.count
        this.#add(product)
        return product.id
    }

    getById(id) {
        const product = this.products.find(p => p.id == id)
        return product !== undefined ? product : null
    }

    getAll() {
        return this.products
    }

    deleteById(id) {
        const updatedProducts = this.products.filter(p => p.id !== id)
        this.products = updatedProducts
    }

    updateById(id, product) {
        const productToUpdate = this.getById(id)
        if (productToUpdate !== null) {
            const productIndex = this.products.indexOf(productToUpdate)
            product.id = id
            this.products.splice(productIndex, 1, product)
        }
    }

    deleteAll() {
        this.products = []
    }

    // private methods
    #add(product) {
        this.products.push(product)
    }

}