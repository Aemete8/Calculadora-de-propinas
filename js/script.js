/**
 * @fileoverview Calculadora de Propinas — Lógica principal
 *
 * Módulo de JavaScript puro (Vanilla JS) que gestiona la lógica
 * de cálculo de propinas y la actualización reactiva del DOM.
 *
 * Flujo de ejecución:
 *   1. El usuario escribe en cualquiera de los tres inputs.
 *   2. Se dispara el evento `input` → `actualizarCalculadora()`.
 *   3. Se leen y parsean los valores del DOM.
 *   4. Se validan los datos obtenidos.
 *   5. Se calculan (o reinician) los resultados.
 *   6. Se actualiza el DOM con los nuevos valores.
 *
 * @author    Brayan Martínez
 * @version   1.0.0
 */


/* ============================================================
    REFERENCIAS AL DOM
    ------------------------------------------------------------
    Se seleccionan una sola vez al cargar el script y se
    reutilizan en todas las funciones, evitando búsquedas
    repetidas en el DOM (costosas en rendimiento).
============================================================ */
/** @type {HTMLInputElement} Input del valor total de la cuenta */
const inputValorTotal = document.querySelector('#cuenta')

/** @type {HTMLInputElement} Input del porcentaje de propina */
const inputPorcentaje = document.querySelector('#porcentaje')

/** @type {HTMLInputElement} Input de la cantidad de personas */
const inputCantidadPersonas = document.querySelector('#personas')

/** @type {HTMLElement} Elemento que muestra el subtotal calculado */
const spanSubtotal = document.querySelector('#resultado-subtotal')

/** @type {HTMLElement} Etiqueta dinámica de la fila de propina (ej. "Propina (15%)") */
const spanPropina = document.querySelector('#propina-total')

/** @type {HTMLElement} Elemento que muestra el monto de la propina */
const spanResultadoPropina = document.querySelector('#resultado-propina')

/** @type {HTMLElement} Elemento que muestra el costo por persona */
const spanTotalPersonas = document.querySelector('#resultado-por-persona')

/** @type {HTMLElement} Elemento que muestra el total general */
const spanResultadoTotal = document.querySelector('#resultado-total')

/** @type {HTMLElement} Bloque de mensaje de error accesible */
const bloqueMensajeAlerta = document.querySelector('.calculator__error')


/* ============================================================
   FUNCIONES DE UTILIDAD
   ============================================================ */

/**
 * Convierte el valor de un input a número entero.
 * Usa `parseInt` para ignorar decimales en campos como "personas".
 *
 * @param  {HTMLInputElement} valor - El elemento input a leer.
 * @returns {number} Número entero o `NaN` si el campo está vacío/inválido.
 */
function convertirValoresEnteros(valor) {
    return parseInt(valor.value)
}

/**
 * Convierte el valor de un input a número decimal (float).
 * Usa `parseFloat` para campos que admiten centavos, como la cuenta.
 *
 * @param  {HTMLInputElement} valor - El elemento input a leer.
 * @returns {number} Número decimal o `NaN` si el campo está vacío/inválido.
 */
function convertirValoresDecimales(valor) {
    return parseFloat(valor.value)
}

/**
 * Actualiza el `textContent` de un elemento del DOM.
 * Centraliza todas las escrituras al DOM para facilitar
 * futuras refactorizaciones (p. ej. añadir animaciones).
 *
 * @param {HTMLElement} elemento  - El nodo cuyo contenido se actualizará.
 * @param {string}      contenido - El texto a escribir en el nodo.
 * @returns {void}
 */
function actualizarContenido(elemento, contenido) {
    elemento.textContent = contenido
}

/**
 * Formatea un número como cadena de moneda con símbolo `$`.
 * Siempre muestra dos decimales (ej. 5 → "$5.00").
 *
 * @param  {number} numero - Valor numérico a formatear.
 * @returns {string} Cadena con formato "$X.XX".
 */
function formatearNumero(numero) {
    return '$' + numero.toFixed(2)
}


/* ============================================================
    FUNCIONES DE INTERFAZ (UI)
============================================================ */

/**
 * Muestra el bloque de mensaje de error en el DOM.
 * Elimina la clase `.hidden` para hacerlo visible e
 * inserta el mensaje de validación correspondiente.
 *
 * El atributo `role="alert"` del elemento garantiza que
 * los lectores de pantalla anuncien el mensaje al aparecer.
 *
 * @param {HTMLElement} bloqueTexto - El contenedor del mensaje de error.
 * @returns {void}
 */
function mostrarBloque(bloqueTexto) {
    bloqueTexto.classList.remove('hidden')
    actualizarContenido(bloqueTexto, 'Ingresa un valor valido, no se permiten valores negativos')
}

/**
 * Oculta el bloque de mensaje de error añadiendo `.hidden`.
 * Se llama cuando los datos son válidos o están vacíos.
 *
 * @param {HTMLElement} bloqueTexto - El contenedor del mensaje de error.
 * @returns {void}
 */
function ocultarBloque(bloqueTexto) {
    bloqueTexto.classList.add('hidden')
}


/* ============================================================
    FUNCIONES DE CÁLCULO
============================================================ */

/**
 * Calcula la propina, el total y el costo por persona
 * a partir de los valores ingresados por el usuario.
 *
 * @param  {Object} valores           - Objeto con los datos del formulario.
 * @param  {number} valores.subtotal  - Monto base de la cuenta (sin propina).
 * @param  {number} valores.porcentaje- Porcentaje de propina (0–100).
 * @param  {number} valores.personas  - Cantidad de personas entre las que se divide.
 * @returns {{ propina: number, costoPorPersona: number, total: number }}
 *          Objeto con los tres resultados calculados.
 */
function calcularResultados(valores) {
    const { subtotal, porcentaje, personas } = valores;

    const propina = subtotal * (porcentaje / 100)
    const total = subtotal + propina
    const costoPorPersona = total / personas

    return {
        propina,
        costoPorPersona,
        total
    }
}


/* ============================================================
    FUNCIONES DE ESTADO
============================================================ */

/**
 * Reinicia todos los campos de resultado a su valor inicial `$0.00`.
 * Se invoca cuando los inputs están vacíos o son `NaN`, evitando
 * mostrar resultados obsoletos mientras el usuario escribe.
 *
 * @returns {void}
 */
function reiniciarInterfaz() {
    actualizarContenido(spanSubtotal, '$0.00')
    actualizarContenido(spanResultadoPropina, '$0.00')
    actualizarContenido(spanTotalPersonas, '$0.00')
    actualizarContenido(spanResultadoTotal, '$0.00')
}

/**
 * Actualiza el DOM con los resultados del cálculo.
 * También actualiza la etiqueta de "Propina" para incluir
 * el porcentaje actual (ej. "Propina (15%)").
 *
 * @param {Object} valores              - Objeto con los datos de entrada.
 * @param {number} valores.subtotal     - Monto base de la cuenta.
 * @param {number} valores.porcentaje   - Porcentaje de propina aplicado.
 * @param {Object} resultados               - Objeto con los valores calculados.
 * @param {number} resultados.propina       - Monto de la propina.
 * @param {number} resultados.costoPorPersona - Costo dividido por persona.
 * @param {number} resultados.total         - Total general (cuenta + propina).
 * @returns {void}
 */
function mostrarResultados(valores, resultados) {
    const { subtotal, porcentaje } = valores;
    const { propina, costoPorPersona, total } = resultados;
    actualizarContenido(spanSubtotal, formatearNumero(subtotal))
    actualizarContenido(spanPropina, `Propina (${porcentaje}%)`)
    actualizarContenido(spanResultadoPropina, formatearNumero(propina))
    actualizarContenido(spanResultadoTotal, formatearNumero(total))
    actualizarContenido(spanTotalPersonas, formatearNumero(costoPorPersona))
}


/* ============================================================
    FUNCIONES DE LECTURA Y VALIDACIÓN
============================================================ */

/**
 * Lee y parsea los tres campos del formulario, devolviendo
 * un objeto con los valores tipados listos para validar y calcular.
 *
 * @returns {{ porcentaje: number, subtotal: number, personas: number }}
 *          Objeto con los tres valores del formulario.
 *          Cualquiera puede ser `NaN` si el campo está vacío.
 */
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

/**
 * Valida que los valores del formulario sean utilizables para el cálculo.
 *
 * Reglas de validación:
 *   - Ningún campo puede ser `NaN` (vacío o texto).
 *   - `subtotal` y `porcentaje` no pueden ser negativos.
 *   - `personas` debe ser mayor a 0 (no se puede dividir entre 0).
 *
 * @param  {{ subtotal: number, porcentaje: number, personas: number }} valores
 * @returns {{ esValido: boolean, motivo?: 'valoresNaN'|'valoresNegativos' }}
 *          Objeto de resultado de validación. Si `esValido` es `false`,
 *          `motivo` indica la causa del fallo.
 */
function validarDatos(valores) {

    if (isNaN(valores.subtotal) || isNaN(valores.porcentaje) || isNaN(valores.personas)) {
        return {
            esValido: false,
            motivo: 'valoresNaN'
        }
    }
    if (valores.subtotal < 0 || valores.porcentaje < 0 || valores.personas <= 0) {
        return {
            esValido: false,
            motivo: 'valoresNegativos'
        }
    }

    return {
        esValido: true,
    }
}


/* ============================================================
    CONTROLADOR PRINCIPAL
============================================================ */

/**
 * Orquesta el ciclo completo de actualización de la calculadora.
 * Se ejecuta en cada evento `input` de los tres campos.
 *
 * Flujo interno:
 *   1. Leer valores del DOM → `obtenerValores()`
 *   2. Validar los valores  → `validarDatos()`
 *   3a. Si son NaN (campos vacíos): reiniciar UI y ocultar error.
 *   3b. Si son negativos/inválidos: mostrar mensaje de error.
 *   3c. Si son válidos: calcular y renderizar resultados.
 *
 * @returns {void}
 */
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


/* ============================================================
    EVENT LISTENERS
    ------------------------------------------------------------
    Se escucha el evento `input` (dispara en cada pulsación de
    tecla) en los tres campos para una actualización en tiempo real.
============================================================ */

inputValorTotal.addEventListener('input', actualizarCalculadora)
inputPorcentaje.addEventListener('input', actualizarCalculadora)
inputCantidadPersonas.addEventListener('input', actualizarCalculadora)