class User {
    constructor(name, lastName, books = [], pets = []) {
        this.name = name
        this.lastName = lastName
        this.books = books
        this.pets = pets
    }

    getFullName() {
        return `${this.name} ${this.lastName}`
    }

    addPet(pet) {
        if (typeof pet !== 'string') return
        this.pets.push(pet)
    }

    countPets() {
        return this.pets.length
    }

    addBook(name, author) {
        const newBook = { name, author }
        this.books.push(newBook)
    }

    getBookNames() {
        return this.books.map(book => book.name)
    }

}

const user1 = new User("Juan", "Perez")
user1.addBook("Clean Code", "Robert C. Martin")
user1.addBook("Clean Architecture", "Robert C. Martin")
user1.addPet("Luna")
user1.addPet("Siri")
console.log(user1.getFullName())
console.log(user1.getBookNames())
console.log(user1.countPets())
