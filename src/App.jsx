import { useJsonData } from './hooks/useJsonData.js';
import { DATA_PATHS } from './services/dataService.js';
import Navbar from './components/Navbar.jsx';
import Estado from './components/Estado.jsx';
import AboutMe from './components/AboutMe.jsx';
import Projects from './components/Projects.jsx';
import News from './components/News.jsx';
import { construirMailto } from './utils/mailto.js';
import Contacto from './components/Contact.jsx';

export const ENLACES = [
  { id: 'introduccion', etiqueta: 'Introducción' },
  { id: 'sobre-mi', etiqueta: 'Sobre mí' },
  { id: 'proyectos', etiqueta: 'Proyectos' },
  { id: 'noticias', etiqueta: 'Noticias' },
  { id: 'contacto', etiqueta: 'Contacto' },
];

export default function App() {
  const { data: perfil, loading, error } = useJsonData(DATA_PATHS.perfil);

  const abrirCorreo = (datos) => {
  if (!perfil?.email) return;
  window.location.href = construirMailto(perfil.email, datos);
  };

  return (
    <>
      <Navbar marca="Portafolio" enlaces={ENLACES} />

      <main id="contenido">
        <Estado cargando={loading} error={error}>
          {perfil && (
            <AboutMe
              nombre={perfil.nombre}
              titular={perfil.titular}
              bio={perfil.bio}
              foto={perfil.foto}
              fotoAlt={perfil.fotoAlt}
              redes={perfil.redes}
              parrafos={perfil.sobreMi?.parrafos}
              habilidades={perfil.sobreMi?.habilidades}
            />
          )}
          <Projects />
          <News />
          <Contacto
            onEnviar={abrirCorreo}
            mensajeExito="Se abrió tu programa de correo con el mensaje listo para enviar."
          />
        </Estado>
      </main>
    </>
  );
}
