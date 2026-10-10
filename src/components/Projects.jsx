import { useJsonData } from '../hooks/useJsonData.js';
import { DATA_PATHS } from '../services/dataService.js';
import Estado from './Estado.jsx';
import ProjectCard from './ProjectCard.jsx';

/**
 * Sección "Proyectos"
 * Carga `projects.json` con `useJsonData`
 * Muestra una `ProjectCard` por proyecto
*/

export default function Projects() {
  const { data, loading, error } = useJsonData(DATA_PATHS.proyectos);
  const proyectos = data?.proyectos ?? [];

  return (
    <section id="proyectos" className="py-5 seccion-alterna" aria-labelledby="proyectos-titulo">
      <div className="container">
        <h2 id="proyectos-titulo" className="seccion-titulo mb-4">
          Proyectos
        </h2>

        <Estado cargando={loading} error={error}>
          {proyectos.length === 0 ? (
            <p>Aún no hay proyectos para mostrar.</p>
          ) : (
            <div className="row g-4">
              {proyectos.map(({ id, ...proyecto }) => (
                <div className="col-12 col-md-6 col-lg-4" key={id}>
                  <ProjectCard {...proyecto} />
                </div>
              ))}
            </div>
          )}
        </Estado>
      </div>
    </section>
  );
}