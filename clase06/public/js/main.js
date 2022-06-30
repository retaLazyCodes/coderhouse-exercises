const socket = io.connect();

let listaTemplate = ''

document.addEventListener('DOMContentLoaded', event => {
    (async () => {
        const response = await fetch('/productos/template')
        const data = await response.text()
        console.log(data)
        listaTemplate = Handlebars.compile(data)
    })();
})


/* si recibo productos, los muestro usando handlebars */
socket.on('productos', function (productos) {
    console.log('productos socket client')
    document.getElementById('datos').innerHTML = data2TableHBS(productos)
});

/* obtengo el formulario */
const form = document.querySelector('form');

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
            socket.emit('update', 'ok');
        })
        .catch(error => {
            console.log('ERROR', error);
        });
});

function data2TableHBS(productos) {
    const plantilla = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>

        {{#if productos.length}}
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                </tr>
                {{#each productos}}
                <tr>
                    <td>{{this.title}}</td>
                    <td>$ {{ this.price }}</td>
                    <td><img width="50" src={{this.thumbnail}} alt="not found"></td>
                </tr>
                {{/each}}
            </table>
        </div>
        {{/if}}
    `

    console.log(productos);
    // reemplazar 'template' por 'listaTemplate'
    var template = Handlebars.compile(plantilla);
    let html = template({ productos: productos });
    return html;
}
