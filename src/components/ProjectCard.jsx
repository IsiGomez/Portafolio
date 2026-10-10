import PropTypes from 'prop-types';

/**
 * Tarjeta (Card de Bootstrap) de un proyecto; el botón es el único elemento que enlaza.
 *
 * @param {object} props
 * @param {string} props.titulo
 * @param {string} props.descripcion
 * @param {string} props.imagen
 * @param {string} props.imagenAlt
 * @param {string[]} [props.tecnologias]
 * @param {string} props.enlace
 * @param {string} [props.etiquetaEnlace]
*/

export default function ProjectCard({
  titulo,
  descripcion,
  imagen,
  imagenAlt,
  tecnologias = [],
  enlace,
  etiquetaEnlace = 'Ver proyecto',
  imagenClase = '',
}) {
  return (
    <article className="card h-100 proyecto-card">
      <img
        src={imagen}
        alt={imagenAlt}
        className={`card-img-top ${imagenClase}`}
        width="640"
        height="360"
        loading="lazy"
      />

      <div className="card-body d-flex flex-column">
        <h3 className="card-title h5">{titulo}</h3>
        <p className="card-text">{descripcion}</p>

        {tecnologias.length > 0 && (
          <ul className="list-unstyled d-flex flex-wrap gap-1 mb-3" aria-label="Tecnologías utilizadas">
            {tecnologias.map((tecnologia) => (
              <li key={tecnologia}>
                <span className="badge badge-tech">{tecnologia}</span>
              </li>
            ))}
          </ul>
        )}

        <a
          className="btn btn-outline-primary mt-auto align-self-start"
          href={enlace}
          target="_blank"
          rel="noopener noreferrer"
        >
          {etiquetaEnlace}
          <span className="visually-hidden"> de {titulo} (se abre en una pestaña nueva)</span>
        </a>
      </div>
    </article>
  );
}

ProjectCard.propTypes = {
  titulo: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  imagen: PropTypes.string.isRequired,
  imagenAlt: PropTypes.string.isRequired,
  tecnologias: PropTypes.arrayOf(PropTypes.string),
  enlace: PropTypes.string.isRequired,
  etiquetaEnlace: PropTypes.string,
};