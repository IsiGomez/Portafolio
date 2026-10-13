# Portafolio personal (React + Bootstrap) 

### Desarrolladora: Isidora Gómez.

Portafolio de **DSY1104 – Desarrollo Fullstack II, Evaluación Formativa N° 2**: componentes React reutilizables, componentes de Bootstrap, datos cargados desde JSON y pruebas unitarias con Vitest.


## Tecnologías

React 18, Vite 5, Bootstrap 5.3, Bootstrap Icons, PropTypes. Pruebas con Vitest 3, React Testing Library, user-event y jsdom. Cobertura con v8 y revisión de código con ESLint.

## Instalación y ejecución

```bash
git clone https://github.com/IsiGomez/Portafolio.git
cd Portafolio
npm install
npm run dev
npm run build
npm run preview
```

## Pruebas y cobertura

```bash
npm test
npm run test:watch
npm run test:coverage
npm run lint
```

El informe de cobertura queda en `coverage/index.html`. 

Los casos de prueba y los resultados de la última ejecución están en [docs/PLAN_DE_PRUEBAS.md](docs/PLAN_DE_PRUEBAS.md).

## Estructura

```
public/favicon.svg  ícono del sitio
public/data/    información en JSON
public/img/
src/components/
src/hooks/      useJsonData (carga de JSON con estados loading/error)
src/services/   dataService (lectura de JSON)
src/utils/      validaciones, formato de fechas, enlace mailto
src/tests/      pruebas Vitest, helpers, fixtures y arranque
docs/           plan de pruebas y capturas
```

## Decisiones de diseño

- **Presentación vs. contenedores:** `ProjectCard`, `CampoFormulario` o `AboutMe` solo reciben props; `Projects`, `News` y `App` cargan datos y los pasan hacia abajo.

- **Datos en JSON leídos con `fetch`:** `useJsonData` centraliza carga y error, y cancela la petición al desmontar. Si falla `profile.json`, solo la portada muestra el error y el resto de las secciones sigue disponible.

- **Accesibilidad:** `alt` en imágenes, etiquetas asociadas a cada campo, errores con `aria-invalid`, foco visible y respeto de `prefers-reduced-motion`.

- **Rendimiento:** imágenes livianas con `width` y `height`, carga diferida (`loading="lazy"`) en las tarjetas de proyectos, sin fuentes externas y build minificado con Vite.

- **Contacto sin backend:** el formulario valida y abre el programa de correo con `mailto:`.

- **Props documentadas y validadas:** JSDoc y PropTypes en los componentes que reciben props.

- **Pruebas con Vitest, Testing Library y jsdom:** corren en Node, sin navegador, y sin depender de la red (`fetch` simulado).


## Personalizar el contenido

Edita `public/data/profile.json`, `projects.json` y `news.json` (fechas `AAAA-MM-DD`) y las imágenes de `public/img/`, manteniendo los textos `alt`.