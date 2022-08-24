let msjsTemplate = ''
let messageForm = null

/* si recibo mensajes, los muestro usando un template de handlebars compilado */
socket.on('mensajes', async function (mensajes) {
    const response = await fetch('/mensajes/template')
    const data = await response.text()
    msjsTemplate = Handlebars.compile(data)

    document.getElementById('mensajes').innerHTML = data2HBS(mensajes)
    if (messageForm == null) {
        messageForm = document.getElementById('messageForm')
    }
});

setTimeout(function () {
    messageForm.addEventListener('submit', function (e) {
        e.preventDefault()
        addMessage()
    })
}, 2000);

function addMessage() {
    const newMessage = 
    {
      author: {
        id: document.getElementById('email').value,
        nombre: document.getElementById('name').value,
        apellido: document.getElementById('lastName').value,
        edad: document.getElementById('age').value,
        alias: document.getElementById('alias').value,
        avatar: document.getElementById('avatar').value,
      },
      text: document.getElementById('text').value,
    }
    console.log(newMessage)
    socket.emit('newMessage', newMessage)
}

function data2HBS(mensajes) {
    console.log(mensajes);
    let html = msjsTemplate({ mensajes: mensajes });
    return html;
}