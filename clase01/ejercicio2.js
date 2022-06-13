const mostrarLista = (lista = "lista vacía") => console.log(lista)

mostrarLista()
mostrarLista([1, 2, 3]);

(function (lista = "lista vacía") {
    console.log(lista)
})([1, 2, 3])


// ----------------------------------------------------------- //

const crearMultiplicador = (numero) => {
    return function (numero2) {
        return numero * numero2
    }
}

const duplicar = crearMultiplicador(2)
console.log(duplicar(2))
console.log(duplicar(8))

const triplicar = crearMultiplicador(3)
console.log(triplicar(2))
console.log(triplicar(8))