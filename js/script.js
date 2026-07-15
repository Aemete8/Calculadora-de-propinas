const cuentaTotal = document.querySelector('#cuenta')
const porcentaje = document.querySelector('#porcentaje')
const cantidadPersonas = document.querySelector('#personas')

const resultadoSubtotal = document.querySelector('#resultado-subtotal')
const cantidadPropina = document.querySelector('#resultado-propina')
const resultadoTotal = document.querySelector('#resultado-total')
const resultadoPorPersona = document.querySelector('#resultado-por-persona')

function calcularValores() {
    const valorTotal = parseFloat(cuentaTotal.value)
    const valorPorcentaje = parseInt(porcentaje.value)
    const valorPersonas = parseInt(cantidadPersonas.value)
    
    if (valorTotal < 0 || valorPorcentaje < 0 || valorPersonas <= 0){
        console.error ('Ingrese un dato adecuado')
        return
    }

    const propinaFinal = valorTotal * (valorPorcentaje / 100)
    const precioFinal = (valorTotal + propinaFinal)

    resultadoSubtotal.textContent = valorTotal
    cantidadPropina.textContent = propinaFinal
    resultadoTotal.textContent = precioFinal
    resultadoPorPersona.textContent = precioFinal / valorPersonas
}

cuentaTotal.addEventListener('input', calcularValores)
porcentaje.addEventListener('input', calcularValores)
cantidadPersonas.addEventListener('input', calcularValores)
