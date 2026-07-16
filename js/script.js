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

function actualizarContenido(elemento, contenido) {
    elemento.textContent = contenido
}

function formatearNumero(numero) {
    return '$' + numero.toFixed(2)
}

function mostrarBloque(bloqueTexto) {
    bloqueTexto.classList.remove('hidden')
    actualizarContenido(bloqueTexto, 'Ingresa un valor valido, no se permiten valores negativos')
}

function ocultarBloque(bloqueTexto) {
    bloqueTexto.classList.add('hidden')
}

function calcularResultados(valores) {
    const { subtotal, porcentaje, personas} = valores;

    const propina = subtotal * (porcentaje/100)
    const total = subtotal + propina
    const costoPorPersona = total / personas

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

function obtenerValores() {
    const valorSubtotal = convertirValoresDecimales(inputValorTotal)
    const valorPersonas = convertirValoresEnteros(inputCantidadPersonas)
    const valorPorcentaje = convertirValoresEnteros(inputPorcentaje)
    
    const valores = {
        porcentaje: valorPorcentaje,
        subtotal: valorSubtotal,
        personas: valorPersonas
    }

    return valores
}

function validarDatos(valores) {

    if (isNaN(valores.subtotal) || isNaN(valores.porcentaje)|| isNaN(valores.personas)){
        return {
            esValido: false,
            motivo: 'valoresNaN'
        }
    }
    if ( valores.subtotal < 0 || valores.porcentaje < 0 || valores.personas <= 0){  
        return {
            esValido: false,
            motivo: 'valoresNegativos'
        }
    }

    return {
        esValido: true,
    }
}

function actualizarCalculadora() { 
    const valores = obtenerValores()
    const datosValidados = validarDatos(valores)

    if (datosValidados.motivo === 'valoresNaN') {
        reiniciarInterfaz()
        ocultarBloque(bloqueMensajeAlerta)
    } else if (datosValidados.motivo === 'valoresNegativos') {
        mostrarBloque(bloqueMensajeAlerta)
    } else {
        const resultados = calcularResultados(valores)
        ocultarBloque(bloqueMensajeAlerta)
        mostrarResultados(valores, resultados)
    }
}

inputValorTotal.addEventListener('input', actualizarCalculadora)
inputPorcentaje.addEventListener('input', actualizarCalculadora)
inputCantidadPersonas.addEventListener('input', actualizarCalculadora)