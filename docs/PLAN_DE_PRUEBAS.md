# Plan de pruebas

**Herramientas:** Vitest (pruebas y ejecución), React Testing Library y user-event (montaje e interacción), jsdom (DOM simulado), cobertura v8 y ESLint (`npm run lint`).

**Entorno:** Node.js con `jsdom`. Las pruebas no dependen de la red, ya que el `fetch` se reemplaza por un *mock* (`simularFetch` en `src/tests/helpers.js`, basado en `vi.spyOn`).

**Tipo:** pruebas unitarias de componentes, hook, servicios y utilidades, más una prueba de integración de `App`.

## Casos de prueba y resultados esperados

| ID   |       Unidad      |        Caso      | Resultado esperado |
|------|-------------------|------------------|--------------------|
| U-01 | `formatearFecha`  | Fecha ISO válida | Texto en español, sin desfase de día |
| U-02 | `formatearFecha`  | Formato inválido o fecha inexistente | Cadena vacía |
| U-03 | `validarContacto` | Datos válidos | `{}` |
| U-04 | `validarContacto` | Campos vacíos, correo inválido, espacios | Un error por campo inválido |
| U-05 | `construirMailto` | Caracteres especiales | Asunto y cuerpo codificados |
| S-01 | `fetchJson` | Respuesta 200 | Devuelve el JSON |
| S-02 | `fetchJson` | HTTP 500 o falla de red | La promesa se rechaza con mensaje |
| S-03 | `fetchJson` | Se pasa una `signal` de cancelación | `fetch` la recibe |
| S-04 | `DATA_PATHS` | Rutas de los tres JSON | Rutas relativas (sin `/` inicial) a `profile`, `projects` y `news` |
| H-01 | `useJsonData` | Carga exitosa | `loading` pasa a `data` |
| H-02 | `useJsonData` | Carga fallida | `loading` pasa a `error` |
| H-03 | `useJsonData` | El componente se desmonta | La petición se cancela (`signal.aborted`) |
| C-01 | `Estado` | Cargando, error, listo | Spinner `role=status`, alerta `role=alert`, contenido |
| C-02 | `Navbar` | Clic en la hamburguesa | Alterna la clase `show` y `aria-expanded` |
| C-03 | `Navbar` | Clic en un enlace o en la marca | Cierra el menú |
| C-04 | `AboutMe` | Props completas y parciales | Nombre, foto con `alt`, enlaces seguros; omite lo ausente |
| C-05 | `AboutMe` | Párrafos y habilidades | Un `<p>` por párrafo y una insignia por habilidad |
| C-06 | `Projects` / `ProjectCard` | JSON con 3 proyectos | 3 tarjetas en columnas `col-12 col-md-6 col-lg-4` |
| C-07 | `Projects` | JSON con error o lista vacía | Alerta o mensaje informativo |
| C-08 | `ProjectCard` | Con y sin tecnologías, con y sin etiqueta | Insignias solo si hay; texto del botón por defecto o recibido; `rel=noopener` |
| C-09 | `News` | JSON con 2 secciones | 2 secciones con sus noticias |
| C-10 | `News` | Fecha válida o inválida; con y sin enlace | `<time>` legible u original; "Leer más" solo con enlace |
| C-11 | `Contacto` | Envío vacío | 3 errores, `aria-invalid`, no llama a `onEnviar` |
| C-12 | `Contacto` | Corregir un campo | Su error desaparece, los demás permanecen |
| C-13 | `Contacto` | Envío válido | Llama a `onEnviar` con datos recortados, limpia y confirma |
| C-14 | `Footer` | Con y sin `anio`, con y sin redes | Año recibido o actual; íconos con enlace seguro |
| I-01 | `App` | JSON completos | Carga 3 archivos y renderiza todas las secciones |
| I-02 | `App` | Falla `profile.json` | Alerta en la portada; proyectos y noticias siguen visibles |
| I-03 | `App` | Menú móvil desde la aplicación completa | El menú se abre |

## Mocks y simulación de entorno

- `simularFetch(rutas)`: reemplaza `fetch` con `vi.spyOn` y responde JSON, HTTP 500 o 404 según la ruta.
- `vi.fn()`: comprueba que el formulario entrega los datos sin enviar nada real.
- `src/tests/fixtures.js`: datos falsos independientes de los JSON reales.

## Cobertura

`npm run test:coverage` imprime un resumen en consola y genera el informe en `coverage/index.html`. 

Umbrales mínimos en `vite.config.js`: 80 % sentencias, 70 % ramas, 80 % funciones, 80 % líneas. Si baja de esos valores, el comando falla.

## Última ejecución

**Fecha:** 13 de octubre del 2026 · **Comando:** `npm run test:coverage`

- **Archivos de prueba:** 13 pasados de 13.
- **Pruebas:** 55 pasadas de 55.

| Métrica | Resultado | Umbral |
|---------|-----------|--------|
| Sentencias | 99,52 % | 80 % |
| Ramas | 100 % | 70 % |
| Funciones | 95,65 % | 80 % |
| Líneas | 99,52 % | 80 % |

Lo único sin cubrir es `App.jsx`, líneas 24-26 (el cuerpo de `abrirCorreo`, que abre el programa de correo y no se invoca en las pruebas).

## Fuera de alcance

- No hay pruebas end-to-end, de accesibilidad automatizadas ni en navegadores reales: `jsdom` simula el DOM, así que no detecta diferencias de renderizado ni de CSS entre navegadores.
- No se prueba el aspecto visual ni los puntos de quiebre; la responsividad se apoya en la grilla de Bootstrap y se revisa a mano.