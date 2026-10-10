import PropTypes from 'prop-types';
import { useJsonData } from '../hooks/useJsonData.js';
import { DATA_PATHS } from '../services/dataService.js';
import { formatearFecha } from '../utils/formatDate.js';
import Estado from './Estado.jsx';

/**
 * Noticia en formato tarjeta.
 *
 * @param {object} props
 * @param {string} props.titulo
 * @param {string} props.fecha
 * @param {string} props.contenido
 * @param {string} [props.enlace]
 */
function NoticiaItem({ titulo, fecha, contenido, enlace }) {
  return (
    <article className="card noticia-card shadow-sm">
      <div className="card-body d-flex flex-column">
        <h4 className="card-title h5">{titulo}</h4>

        <p className="noticia-fecha mb-2">
          <i className="bi bi-calendar3 me-2" aria-hidden="true" />
          <time dateTime={fecha}>{formatearFecha(fecha) || fecha}</time>
        </p>

        <p className="card-text mb-0">{contenido}</p>

        {enlace && (
          <a
            className="noticia-enlace mt-3 align-self-start"
            href={enlace}
            target="_blank"
            rel="noopener noreferrer"
          > Leer más
            <span className="visually-hidden"> sobre {titulo} (se abre en una pestaña nueva)</span>
            <i className="bi bi-arrow-right ms-1" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}


/**
 * Una columna de noticias con su título.
 *
 * @param {object} props
 * @param {string} props.titulo
 * @param {object[]} [props.noticias]
 */
function NoticiasSeccion({ titulo, noticias = [] }) {
  return (
    <section aria-label={titulo}>
      <h3 className="noticias-subtitulo h5 mb-3">{titulo}</h3>

      {noticias.length === 0 ? (
        <p>No hay noticias en esta sección.</p>
      ) : (
        <div className="d-flex flex-column gap-3">
          {noticias.map(({ id, ...noticia }) => (
            <NoticiaItem key={id} {...noticia} />
          ))}
        </div>
      )}
    </section>
  );
}


/**
 * Sección "Noticias"
 * Carga `news.json` con `useJsonData`
 * Muestra una columna por sección
 */
export default function News() {
  const { data, loading, error } = useJsonData(DATA_PATHS.noticias);
  const secciones = data?.secciones ?? [];

  return (
    <section id="noticias" className="py-5" aria-labelledby="noticias-titulo">
      <div className="container">
        <h2 id="noticias-titulo" className="seccion-titulo mb-4">
          Noticias
        </h2>

        <Estado cargando={loading} error={error}>
          <div className="row g-4">
            {secciones.map(({ id, ...seccion }) => (
              <div className="col-lg-6" key={id}>
                <NoticiasSeccion {...seccion} />
              </div>
            ))}
          </div>
        </Estado>
      </div>
    </section>
  );
}


NoticiaItem.propTypes = {
  titulo: PropTypes.string.isRequired,
  fecha: PropTypes.string.isRequired,
  contenido: PropTypes.string.isRequired,
  enlace: PropTypes.string,
};

NoticiasSeccion.propTypes = {
  titulo: PropTypes.string.isRequired,
  noticias: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })),
};