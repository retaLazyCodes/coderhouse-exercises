function render(msjs) {
    const mensajesHTML = msjs
        .map(msj => {
            return `<div>
                <strong>${msj.author}</strong>:
                <em>${msj.text}</em></div>`
        }).join('<br>')
    document.getElementById('messages').innerHTML = mensajesHTML
}

document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault()
    addMessage()
})

function addMessage() {
    const newMessage = {
        author: document.getElementById('username').value,
        text: document.getElementById('text').value
    }
    console.log(newMessage)
    socket.emit('newMessage', newMessage)
}

socket.on('mensajes', msjs => render(msjs));