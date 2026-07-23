# 🧮 Calculadora de Propinas

Aplicación web minimalista para calcular el monto de propina sobre una cuenta y dividirla entre múltiples personas. Desarrollada con HTML, CSS y JavaScript puros (sin dependencias ni frameworks).

---

## 📋 Tabla de contenidos

- [Demo](#demo)
- [Características](#características)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
- [Guía de estilos](#guía-de-estilos)
- [Metodología CSS — BEM](#metodología-css--bem)
- [Documentación JS](#documentación-js)
- [Accesibilidad](#accesibilidad)
- [Responsive Design](#responsive-design)

---

## ✨ Características

- Cálculo en tiempo real mientras el usuario escribe.
- División del total entre N personas.
- Etiqueta dinámica de propina con porcentaje actual (ej. "Propina (15%)").
- Validación de datos con mensajes de error accesibles.
- Diseño responsive mobile-first.
- Fuentes optimizadas con `display=swap` vía Google Fonts.
- Sin flechas en inputs numéricos (cross-browser).
- Respeta `prefers-reduced-motion` del sistema operativo.

---

## 📁 Estructura del proyecto

```
tip-calculator/
│
├── index.html          # Estructura semántica principal
├── README.md           # Este archivo
│
├── css/
│   └── style.css       # Estilos BEM + Custom Properties
│
├── js/
│   └── script.js       # Lógica JS documentada con JSDoc
│
└── img/
    └── calculator-icon.png   # Ícono del encabezado
```

---

## 🚀 Cómo ejecutar el proyecto

No requiere instalación ni servidor de desarrollo. Solo abre el archivo en el navegador:

```bash
# Opción 1: abrir directamente
open index.html

# Opción 2: con Live Server (VS Code)
# Instala la extensión "Live Server" y haz clic en "Go Live"

# Opción 3: con servidor HTTP de Python
python -m http.server 3000
# Luego abre http://localhost:3000
```

---

## 🎨 Guía de estilos

Todos los tokens de diseño están centralizados en el bloque `:root` de `style.css`.

### Paleta de colores

| Token                     | Valor       | Uso                              |
|---------------------------|-------------|----------------------------------|
| `--color-bg-page`         | `#F0F4F8`   | Fondo de la página               |
| `--color-bg-card`         | `#FFFFFF`   | Fondo de la card calculadora     |
| `--color-bg-results`      | `#F8FAFC`   | Fondo del bloque de resultados   |
| `--color-accent`          | `#2563EB`   | Azul índigo — acento principal   |
| `--color-accent-light`    | `#EFF6FF`   | Tinte de acento (hover/focus)    |
| `--color-text-primary`    | `#0F172A`   | Texto principal                  |
| `--color-text-secondary`  | `#64748B`   | Texto secundario / subtítulos    |
| `--color-error-text`      | `#DC2626`   | Mensajes de error                |

### Tipografía

| Rol              | Familia              | Uso                              |
|------------------|----------------------|----------------------------------|
| UI general       | `Inter`              | Labels, subtítulos, botones      |
| Valores $        | `JetBrains Mono`     | Montos monetarios en resultados  |

### Escala de texto

| Token          | Valor      | px equiv. |
|----------------|------------|-----------|
| `--text-xs`    | `0.75rem`  | 12px      |
| `--text-sm`    | `0.875rem` | 14px      |
| `--text-base`  | `1rem`     | 16px      |
| `--text-lg`    | `1.125rem` | 18px      |
| `--text-xl`    | `1.25rem`  | 20px      |
| `--text-2xl`   | `1.5rem`   | 24px      |
| `--text-3xl`   | `1.875rem` | 30px      |

---

## 🧱 Metodología CSS — BEM

El CSS sigue la convención **BEM (Block Element Modifier)**:

```
.block {}
.block__element {}
.block__element--modifier {}
```

### Bloques presentes

| Bloque              | Descripción                        |
|---------------------|------------------------------------|
| `.calculator`       | Contenedor raíz de la aplicación   |

### Elementos

| Elemento                        | Descripción                          |
|---------------------------------|--------------------------------------|
| `.calculator__header`           | Encabezado con ícono y título        |
| `.calculator__icon-wrapper`     | Contenedor circular del ícono        |
| `.calculator__title`            | Título principal `<h1>`              |
| `.calculator__subtitle`         | Subtítulo descriptivo                |
| `.calculator__form`             | Sección de inputs del formulario     |
| `.calculator__error`            | Mensaje de error accesible           |
| `.calculator__fieldset`         | Agrupación semántica de campos       |
| `.calculator__field`            | Grupo label + input individual       |
| `.calculator__label`            | Etiqueta de cada campo               |
| `.calculator__input-wrapper`    | Contenedor relativo para prefijos/sufijos |
| `.calculator__input`            | Campo de texto base                  |
| `.calculator__input-prefix`     | Símbolo `$` decorativo               |
| `.calculator__input-suffix`     | Símbolo `%` decorativo               |
| `.calculator__results`          | Sección de resultados                |
| `.calculator__results-list`     | Lista `<dl>` de pares label/valor    |
| `.calculator__result-row`       | Fila individual de resultado         |
| `.calculator__result-label`     | Etiqueta `<dt>` de la fila           |
| `.calculator__result-value`     | Valor `<dd>` de la fila              |

### Modificadores

| Modificador                             | Efecto                                      |
|-----------------------------------------|---------------------------------------------|
| `.calculator__result-row--separator`    | Añade borde inferior (separa propina/total) |
| `.calculator__result-row--total`        | Resalta la fila Total con acento azul       |

---

## 📖 Documentación JS

El archivo `script.js` está documentado con **JSDoc**. Cada función incluye:

- `@fileoverview` — descripción general del módulo.
- `@param` — tipo y descripción de cada parámetro.
- `@returns` — tipo y descripción del valor de retorno.
- Comentarios de sección que describen el flujo de datos.

### Funciones principales

| Función                  | Responsabilidad                                    |
|--------------------------|----------------------------------------------------|
| `obtenerValores()`       | Lee y parsea los 3 inputs del DOM                  |
| `validarDatos(valores)`  | Valida NaN y negativos, devuelve motivo si hay error|
| `calcularResultados()`   | Calcula propina, total y costo por persona         |
| `mostrarResultados()`    | Actualiza el DOM con los resultados formateados    |
| `reiniciarInterfaz()`    | Resetea todos los valores a `$0.00`                |
| `actualizarCalculadora()`| Controlador principal — orquesta el flujo completo |

---

## ♿ Accesibilidad

El proyecto apunta a cumplir **WCAG 2.1 nivel AA**:

- `<main>` con `aria-label` como landmark principal.
- `<section>` con `aria-label` para formulario y resultados.
- `<fieldset>` + `<legend class="sr-only">` para agrupar inputs.
- `aria-describedby` en inputs para vincularlos al error.
- `aria-required="true"` en el campo obligatorio.
- `role="alert"` + `aria-live="polite"` en el mensaje de error.
- `aria-live="polite"` en la sección de resultados para anunciar cambios.
- `aria-hidden="true"` en elementos decorativos (ícono, símbolos).
- Anillo de foco visible en todos los inputs (`:focus` con `box-shadow`).
- Clase `.sr-only` para texto solo para lectores de pantalla.

---

## 📱 Responsive Design

Estrategia **mobile-first**: los estilos base son para móvil y los `@media` solo amplían.

| Breakpoint       | Ancho mínimo | Cambios aplicados                            |
|------------------|--------------|----------------------------------------------|
| Base (móvil)     | —            | Card full-width, padding reducido            |
| Tablet           | `600px`      | Centrado vertical, padding mayor, tipografía más grande |
| Desktop          | `960px`      | Card con `max-width: 520px`                  |
| Movimiento       | —            | `prefers-reduced-motion`: desactiva transiciones |