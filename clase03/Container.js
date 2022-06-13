const fs = require('fs');

module.exports = class Container {
    constructor(filename = "file.txt") {
        this.filename = filename
        this.products = []
    }

    static count = 0

    async save(product) {
        Container.count++
        product.id = Container.count
        this.#add(product)
        await this.#writeInDisk()
        return product.id
    }

    async getById(id) {
        await this.#initProductList()
        const product = this.products.find(p => p.id == id)
        return product !== undefined ? product : null
    }

    async getAll() {
        await this.#initProductList()
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

    async #readInDisk() {
        const data = await fs.promises.readFile("productos.txt")
        return data.toString()
    }

    async #initProductList() {
        const data = await this.#readInDisk()
        this.products = JSON.parse(data)
    }

}