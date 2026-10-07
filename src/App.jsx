import Navbar from './components/Navbar.jsx';

export const ENLACES = [
  { id: 'introduccion', etiqueta: 'Introducción' },
  { id: 'sobre-mi', etiqueta: 'Sobre mí' },
  { id: 'proyectos', etiqueta: 'Proyectos' },
  { id: 'noticias', etiqueta: 'Noticias' },
  { id: 'contacto', etiqueta: 'Contacto' },
];

export default function App() {
  return (
    <>
      <Navbar marca="Portafolio" enlaces={ENLACES} />
      <main id="contenido" />
    </>
  );
}