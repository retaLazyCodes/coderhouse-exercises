const fs = require('fs');

module.exports = class MessageContainer {
    constructor(filename = "file.txt") {
        this.filename = filename
        this.messages = []
    }

    static count = 0

    async save(product) {
        MessageContainer.count++
        product.id = MessageContainer.count
        this.#add(product)
        await this.#writeInDisk()
        return product.id
    }

    getById(id) {
        const messaje = this.messages.find(p => p.id == id)
        return messaje !== undefined ? messaje : null
    }

    getAll() {
        return this.messages
    }

    // private methods
    #add(product) {
        this.messages.push(product)
    }

    async #writeInDisk() {
        const jsonMessages = JSON.stringify(this.messages, null, 2)

        fs.promises.writeFile(this.filename, jsonMessages)
            .then(() => {
                console.log('JSON saved');
            })
            .catch(err => {
                console.log(err);
            });
    }

}