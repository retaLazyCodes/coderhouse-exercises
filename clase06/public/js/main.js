const socket = io.connect();

let listaTemplate = ''

/* si recibo productos, los muestro usando un template de handlebars compilado */
socket.on('productos', async function (productos) {
    console.log('productos socket client')

    const response = await fetch('/productos/template')
    const data = await response.text()
    listaTemplate = Handlebars.compile(data)

    document.getElementById('productos').innerHTML = data2TableHBS(productos)
});

/* obtengo el formulario */
const form = document.querySelector('productForm');

form.addEventListener('submit', event => {
    console.log(listaTemplate)
    event.preventDefault();
    const data = { title: form[0].value, price: form[1].value, thumbnail: form[2].value };

    fetch('/api/productos', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(productos => {
            form.reset();
            socket.emit('newProduct', 'ok');
        })
        .catch(error => {
            console.log('ERROR', error);
        });
});

function data2TableHBS(productos) {
    console.log(productos);
    let html = listaTemplate({ productos: productos });
    return html;
}
