let msjsTemplate = ''
let messageForm = null

/* si recibo mensajes, los muestro usando un template de handlebars compilado */
socket.on('mensajes', async function ({ mensajes }) {
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

function addMessage () {
  console.log(messageForm)
  const newMessage =
  {
    email: document.getElementById('email').value,
    nombre: document.getElementById('name').value,
    apellido: document.getElementById('lastName').value,
    edad: document.getElementById('age').value,
    alias: document.getElementById('alias').value,
    avatar: document.getElementById('avatar').value,
    text: document.getElementById('text').value
  }
  console.log(newMessage)
  socket.emit('newMessage', newMessage)
}

function data2HBS (mensajes) {
  const denormalizedMsgs = denormalizeMessages(mensajes)
  let html = msjsTemplate({ mensajes: denormalizedMsgs });
  return html;
}

function denormalizeMessages (mensajes) {

  const authorSchema = new normalizr.schema.Entity("author", {}, { idAttribute: 'email' })
  const messageSchema = new normalizr.schema.Entity(
    "post",
    {
      author: authorSchema
    },
    { idAttribute: "text" },
  )
  const normalizedData = normalizr.normalize(mensajes, [messageSchema])

  const porcNormalizado = JSON.stringify(normalizedData).length
  console.log("Normalizado :", porcNormalizado)
  console.log(normalizedData)

  let denormalizedMsgs = normalizr.denormalize(
    normalizedData.result,
    [messageSchema],
    normalizedData.entities
  );
  console.log(denormalizedMsgs)
  const porcDenormalizado = JSON.stringify(denormalizedMsgs).length
  console.log("Denormalizado: ", porcDenormalizado)


  const porcentaje = (porcNormalizado * 100) / porcDenormalizado
  console.log(`Porcentaje de compresión: ${parseInt(porcentaje)} %`)

  setTimeout(function () {
    document.getElementById('compression').innerHTML = `Compresión: ${parseInt(porcentaje)} %`
  }, 2000);


  return denormalizedMsgs
}