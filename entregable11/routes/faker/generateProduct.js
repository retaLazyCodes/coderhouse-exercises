const { faker } = require('@faker-js/faker');
faker.locale = 'es'

function generateProduct () {
  return {
    id: Math.floor(Math.random() * 100) + 1,
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    thumbnail: faker.image.image()
  }
}

module.exports = { generateProduct }