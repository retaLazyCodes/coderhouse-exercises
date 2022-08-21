const fs = require('fs');
const path = require('node:path');
const Product = require('./Product');

module.exports = class Container {
    constructor(filename = "file.txt") {
        this.filename = filename
        this.products = []
    }

    static count = 0

    async save(product) {
        if (product instanceof Product === false) {
            console.log('el parametro no es de tipo Product')
            return
        }
        Container.count++
        product.id = Container.count
        this.#add(product)
        await this.#writeInDisk()
        return product.id
    }

    getById(id) {
        const product = this.products.find(p => p.id == id)
        return product !== undefined ? product : null
    }

    getAll() {
        return this.products
    }

    async deleteById(id) {
        const updatedProducts = this.products.filter(p => p.id !== id)
        this.products = updatedProducts
        await this.#deleteFromDisk()
        await this.#writeInDisk()
    }

    async deleteAll() {
        await this.#deleteFromDisk()
        this.products = []
    }

    // private methods
    #add(product) {
        this.products.push(product)
    }

    async #writeInDisk() {
        const jsonProducts = JSON.stringify(this.products, null, 2)

        fs.promises.writeFile(this.filename, jsonProducts)
            .then(() => {
                console.log('JSON saved');
            })
            .catch(err => {
                console.log(err);
            });
    }

    async #deleteFromDisk() {
        fs.promises.unlink(this.filename)
            .then(() => {
                console.log('file deleted');
            })
            .catch(err => {
                console.log(err);
            })
    }

}