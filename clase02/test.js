const Container = require('./Container')
const Product = require('./Product');

const container = new Container("productos.txt")

const product1 = new Product(
    'Leche', 150.70,
    'https://www.laserenisimavaatucasa.com.ar/wp-content/uploads/2020/06/7793940448003-1.png'
)
const product2 = new Product(
    'Yerba mate', 700.00,
    'https://m.media-amazon.com/images/I/517VkCCikOL._AC_SX522_.jpg'
)
const product3 = new Product(
    'Desodorante', 320.00,
    'https://m.media-amazon.com/images/I/415ZvcpNDdL._SY355_.jpg'
);


(async function () {
    const count1 = await container.save(product1)
    const count2 = await container.save(product2)
    console.log(`\nCount del contenedor: ${count1} ${count2}`)
})().then(async () => {
    console.log('\ngetById(2)')
    console.log(container.getById(2))
    console.log('\ngetById(3)')
    console.log(container.getById(3))
    console.log('\ngetAll()')
    console.log(container.getAll())
    console.log('\ndeleteById(2)')
    await container.deleteById(2)
    console.log('\nsave(product3)')
    container.save(product3)
    console.log('\ngetAll()')
    console.log(container.getAll())
    // await container.deleteAll()
})





