const inputValorTotal = document.querySelector('#cuenta')
const inputPorcentaje = document.querySelector('#porcentaje')
const inputCantidadPersonas = document.querySelector('#personas')

const spanSubtotal = document.querySelector('#resultado-subtotal')
const spanPropina = document.querySelector('#propina-total')
const spanResultadoPropina = document.querySelector('#resultado-propina')
const spanTotalPersonas = document.querySelector('#resultado-por-persona')
const spanResultadoTotal = document.querySelector('#resultado-total')

const bloqueMensajeAlerta = document.querySelector('.alert-message')

function convertirValoresEnteros(valor) {
    return parseInt(valor.value)
}

function convertirValoresDecimales(valor) {
    return parseFloat(valor.value)
}

function actualizarContenido(span, contenido) {
    span.textContent = contenido
}

function formatearNumero(numero) {
    return '$' + numero.toFixed(2)
}

function mostrarBloque(bloqueTexto) {
    bloqueTexto.classList.remove('hidden')
    bloqueTexto.textContent = 'Ingresa un valor valido, no se permiten valores negativos'
}

function ocultarBloque(bloqueTexto) {
    bloqueTexto.classList.add('hidden')
}

function calcularResultados(subtotal, porcentajePropina, numeroPersonas) {

    const propina = subtotal * (porcentajePropina/100)
    const total = subtotal + propina
    const costoPorPersona = total / numeroPersonas

    return{
        propina,
        costoPorPersona,
        total
    }
}

function reiniciarInterfaz() {
    actualizarContenido(spanSubtotal, '$0.00')
    actualizarContenido(spanResultadoPropina, '$0.00')
    actualizarContenido(spanTotalPersonas, '$0.00')
    actualizarContenido(spanResultadoTotal, '$0.00')
}

function mostrarResultados(valores, resultados) {
    const { subtotal, porcentaje} = valores;
    const { propina, costoPorPersona, total} = resultados;
    actualizarContenido(spanSubtotal, formatearNumero(subtotal))
    actualizarContenido(spanPropina, `Propina (${porcentaje}%)`)
    actualizarContenido(spanResultadoPropina, formatearNumero(propina))
    actualizarContenido(spanResultadoTotal, formatearNumero(total))
    actualizarContenido(spanTotalPersonas, formatearNumero(costoPorPersona))
}

function validarDatos() {
    
}

function calcularValores() { 
    const valorSubtotal = convertirValoresDecimales(inputValorTotal)
    const valorPorcentaje = convertirValoresEnteros(inputPorcentaje)
    const valorPersonas = convertirValoresEnteros(inputCantidadPersonas)

    const valores ={
        subtotal: valorSubtotal,
        porcentaje: valorPorcentaje,
        personas: valorPersonas
    }

    if (isNaN(valores.subtotal) || isNaN(valores.porcentaje)|| isNaN(valores.personas)){
        reiniciarInterfaz()
        return
    } else if ( valores.subtotal < 0 || valores.porcentaje < 0 || valores.personas <= 0){  
        mostrarBloque(bloqueMensajeAlerta)
        return
    } else {
        const resultados = calcularResultados(valores.subtotal, valores.porcentaje, valores.personas)
        mostrarResultados(valores, resultados)
        ocultarBloque(bloqueMensajeAlerta)
        return
    }
}

inputValorTotal.addEventListener('input', calcularValores)
inputPorcentaje.addEventListener('input', calcularValores)
inputCantidadPersonas.addEventListener('input', calcularValores)