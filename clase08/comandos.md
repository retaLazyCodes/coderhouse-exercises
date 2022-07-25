Código para ejecutar en MongoShell
```js
// 0) Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.
use ecommerce

// 1) Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB. 
// 2) Definir las claves de los documentos en relación a los campos de las tablas de esa base. 
var products =
  [
    {
      "name": "Yerba mate", "price": 250, "description": "Yerba mate elaborada con palo",
      "code": "123", "stock": 30, "thumbnail": "https://www.taragui.com/img/products/x1.jpg.pagespeed.ic.0CLzXnsIOL.jpg"
    },
    {
      "name": "Azúcar Ledesma", "price": 200, "description": "Azucar tipo A",
      "code": "AZU", "stock": 55, "thumbnail": "https://www.casa-segal.com/wp-content/uploads/2019/03/azucar-kilo-ledesma-reposteria-mendoza-casa-segal-1-600x600.jpg"
    },
    {
      "name": "Leche serenisima", "price": 150, "description": "lorem ipsum...",
      "code": "LEC", "stock": 35, "thumbnail": "https://www.laserenisimavaatucasa.com.ar/wp-content/uploads/2020/06/7793940448003-1.png"
    },
    {
      "name": "Yogurisimo", "price": 210, "description": "lorem ipsum...",
      "code": "YOR", "stock": 25, "thumbnail": "https://www.yogurisimo.com.ar/wp-content/uploads/sites/2/2021/02/YSS-Sachet-1kg-Frutilla_Monalisa-1011x1024.png"
    },
    {
      "name": "Webcam Xiaomi", "price": 4999, "description": "Camara Full HD",
      "code": "WEX", "stock": 15, "thumbnail": "https://images.fravega.com/f300/965ec90b3ebd61a0d4c68497fdde79a8.jpg"
    },
    {
      "name": "Teclado PC", "price": 1680, "description": "Verbatim USB Negro",
      "code": "TEV", "stock": 33, "thumbnail": "https://intermaco.com/productos/98121.jpg"
    },
    {
      "name": "Mouse USB", "price": 850, "description": "Panacom Color Amarillo",
      "code": "MOP", "stock": 42, "thumbnail": "https://santafeshop.com.ar/shop/electronica-nucleo/1310-home_default/mouse-usb-panacom-ms-9546-amarillo.jpg"
    },
    {
      "name": "Mouse Gamer USB", "price": 4299, "description": "Logitech Negro",
      "code": "MOL", "stock": 22, "thumbnail": "https://logitechar.vteximg.com.br/arquivos/ids/156566-1000-1000/910-004344_1.png?v=636973475589400000"
    },
    {
      "name": "Joistick Wireless", "price": 6190, "description": "Redragon Negro",
      "code": "JRE", "stock": 32, "thumbnail": "https://www.venex.com.ar/products_images/1534181389_ll.png"
    },
    {
      "name": "Teclado Gamer USB", "price": 1400, "description": "Logitech Negro",
      "code": "TEL", "stock": 15, "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_815666-MLA32722390520_102019-O.webp"
    },

  ];

var messages =
[
    { "email": "juanj@gmail.com", "text": "lorem ipsum...", "date": new Date(2022, 07, 24)},
    { "email": "ecommerce@ayuda.com", "text": "lorem ipsum...", "date": new Date(2022, 07, 24) },
    { "email": "juanj@gmail.com", "text": "lorem ipsum...", "date": new Date(2022, 07, 25) },
    { "email": "ecommerce@ayuda.com", "text": "lorem ipsum...", "date": new Date(2022, 07, 25) },
    { "email": "belu_02@gmail.com", "text": "lorem ipsum...", "date": new Date(2022, 07, 25) },
    { "email": "ecommerce@ayuda.com", "text": "lorem ipsum...", "date": new Date(2022, 07, 25) },
    { "email": "belu_02@gmail.com", "text": "lorem ipsum...", "date": new Date(2022, 07, 26) },
    { "email": "ecommerce@ayuda.com", "text": "lorem ipsum...", "date": new Date(2022, 07, 26) },
    { "email": "bretamar@gmail.com", "text": "lorem ipsum...", "date": new Date(2022, 07, 27) },
    { "email": "ecommerce@ayuda.com", "text": "lorem ipsum...", "date": new Date(2022, 07, 27) },
]

db.mensajes.insert(messages)
db.productos.insert(products)


// 3) Listar todos los documentos en cada colección.
db.productos.find()
db.mensajes.find()

// 4) Mostrar la cantidad de documentos almacenados en cada una de ellas.
db.productos.count()
db.mensajes.count() 


// 5) Realizar un CRUD sobre la colección de productos:
// a) Agregar un producto más en la colección de productos 

db.productos.insert(
  {
      "name": "Estufa Electrica Tilcara", "price": 2900, "description": "Vertical Anticaída 1200w con llave de seguridad",
      "code": "EST", "stock": 20, "thumbnail": "https://astralproductos.com/wp-content/uploads/2018/04/Estufa-WCS-PNG-600x600.png"
  })

// b)  Realizar una consulta por nombre de producto específico:
//  Listar los productos con precio menor a 1000 pesos.
db.productos.find({$where: "this.price < 1000"})
//  Listar los productos con precio entre los 1000 a 3000 pesos.
db.productos.find({
        'price': { '$gt': 1000, '$lt': 3000}
})
//  Listar los productos con precio mayor a 3000 pesos.
db.productos.find({$where: "this.price < 3000"})
//  Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
db.productos.find({})
.sort({"price":1})
.skip(2)
.limit(1)

// c) Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
db.productos.updateMany({}, {"$set":{"stock": 100}})

// d) Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.
db.productos.updateMany({$where: "this.price > 4000"}, {"$set":{"stock": 0}})

// e) Borrar los productos con precio menor a 1000 pesos
db.productos.remove({$where: "this.price < 1000"})

// 6) Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.
// desde la terminal de Mongo Shell ejecutar:
db.createUser(
  {
    user: "pepe",
    pwd: "asd456",
    roles: [
       { role: "read", db: "ecommerce" }
    ]
  }
)
// cerrar mongo y volver a ingresar usando:
mongo --port 27017 --authenticationDatabase "ecommerce" -u "pepe" -p "asd456"
// solo tiene permisos de lectura de la BD "ecommerce"
use ecommerce
// esto si se puede ejecutar
db.productos.find({}).pretty()
// esto da error de usuario no autorizado
db.mensajes.insert({ "email": "test@test.com", "text": "hola", "date": new Date(2022, 06, 10) });


```