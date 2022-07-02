const fs = require('fs');

module.exports = class MessageContainer {
    constructor(filename = "file.txt") {
        this.filename = filename
        this.messages = []
    }

    static count = 0

    async save(message) {
        MessageContainer.count++
        message.id = MessageContainer.count
        this.#add(message)
        await this.#writeInDisk()
        return message.id
    }

    getAll() {
        return this.messages
    }

    // private methods
    #add(message) {
        this.messages.push(message)
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