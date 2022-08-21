let nombre = "Pepe"
let edad = 25
let precio = 99.90

const seriesFavoritas = ["Breaking Bad", "Drake & Josh", "GTO"]

const peliculasFavoritas = [
    {
        nombre: "La momia",
        año: 1999,
        personajes: ["Rick O'Connell", "Evelyn Carnahan", "Jonathan Carnahan"]
    },
    {
        nombre: "The Truman Show",
        año: 1998,
        personajes: ["Truman Burbank", "Hannah Gill", "Christof"]
    },
    {
        nombre: "Knives Out",
        año: 2019,
        personajes: ["Marta Cabrera", "Linda Drysdale", "Benoit Blanc"]
    }
]

console.log(nombre)
console.log(edad)
console.log(precio)
console.log(seriesFavoritas)
console.log(peliculasFavoritas)

edad++
console.log(edad)
seriesFavoritas.push("Gravity Falls")
console.log(seriesFavoritas)