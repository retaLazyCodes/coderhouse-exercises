class Contador {
    constructor(nombreResponsable) {
        this.nombreResponsable = nombreResponsable
        this.conteo = 0
    }

    static conteoGeneral = 0

    contar() {
        this.conteo++
        Contador.conteoGeneral++
    }

}


const cuenta1 = new Contador("Juan")
cuenta1.contar()
console.log(`${cuenta1.nombreResponsable}: ${cuenta1.conteo}`)

const cuenta2 = new Contador("Pepe")
cuenta2.contar()
cuenta2.contar()
console.log(`${cuenta2.nombreResponsable}: ${cuenta2.conteo}`)

console.log(Contador.conteoGeneral)