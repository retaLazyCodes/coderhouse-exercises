const form = document.getElementById('registerForm')
const btn = document.getElementById('gotoLogin')

form.addEventListener('submit', evt => {
  evt.preventDefault();
  let data = new FormData(form);
  let obj = {};
  data.forEach((value, key) => obj[key] = value);
  fetch('/api/sessions/register', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(result => result.json()).then(json => {
    if (json.status == "success") {
      console.log(json)
      console.log("todo ok")
      window.location.href = '/login'
    }
    else {
      window.location.href = '/registerfail'
    }
  })
})


btn.addEventListener('click', evt => {
  evt.preventDefault()
  window.location.href = '/login'
})