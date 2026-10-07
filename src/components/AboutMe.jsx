import PropTypes from 'prop-types';

/**
 * Portada (foto, nombre, bio, redes) y sección "Sobre mí" (texto y habilidades).
 * Todo llega por props.
 *
 * @param {object} props
 * @param {string} props.nombre
 * @param {string} [props.titular] 
 * @param {string} [props.bio] 
 * @param {string} [props.foto]
 * @param {string} [props.fotoAlt] 
 * @param {{id: string, etiqueta: string, url: string}[]} [props.redes] 
 * @param {string[]} [props.parrafos] 
 * @param {string[]} [props.habilidades]
*/

export default function AboutMe({
  nombre,
  titular,
  bio,
  foto,
  fotoAlt,
  redes = [],
  parrafos = [],
  habilidades = [],
}) {
    return (
        <>
            <section id="introduccion" className="hero py-5" aria-labelledby="hero-titulo">
                <div className="container">
                    <div className="row align-items-center g-4 py-lg-4">
                        
                        <div className="col-8 col-sm-5 col-md-4 col-lg-3 mx-auto mx-md-0">
                            <img
                                src={foto}
                                alt={fotoAlt}
                                width="240"
                                height="240"
                                className="hero-foto img-fluid rounded-circle"
                            />
                        </div>

                        <div className="col-md-8 col-lg-9 text-center text-md-start">
                            <h1 id="hero-titulo" className="hero-nombre">
                                {nombre}
                            </h1>

                            {titular && <p className="hero-titular">{titular}</p>}
                            {bio && <p className="hero-bio">{bio}</p>}

                            <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
                                <a className="btn btn-light" href="#proyectos">
                                Ver proyectos
                                </a>

                                {redes.map((red) => (
                                    <a
                                        key={red.id}
                                        className="btn btn-outline-light"
                                        href={red.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className={`bi bi-${red.id} me-2`} aria-hidden="true" />
                                        {red.etiqueta}
                                    </a>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="sobre-mi" className="py-5" aria-labelledby="sobre-mi-titulo">
                <div className="container">
                    <h2 id="sobre-mi-titulo" className="seccion-titulo mb-4">
                        Sobre mí
                    </h2>

                    <div className="row g-4 g-lg-5 align-items-start">
                        <div className="col-lg-7 sobre-mi-texto">
                            {parrafos.map((texto) => (
                                <p key={texto}>{texto}</p>
                            ))}
                        </div>

                        <div className="col-lg-5">
                            <div className="card habilidades-card shadow-sm">
                                <div className="card-body p-4">
                                    <h3 className="h5 mb-3">
                                        <i className="bi bi-code-slash me-2" aria-hidden="true" />
                                        Habilidades
                                    </h3>

                                    <ul className="list-unstyled d-flex flex-wrap gap-2 mb-0">
                                        {habilidades.map((habilidad) => (
                                            <li key={habilidad}>
                                                <span className="badge badge-tech">{habilidad}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

AboutMe.propTypes = {
  nombre: PropTypes.string.isRequired,
  titular: PropTypes.string,
  bio: PropTypes.string,
  foto: PropTypes.string,
  fotoAlt: PropTypes.string,
  redes: PropTypes.arrayOf(
    PropTypes.shape({
    id: PropTypes.string.isRequired,
      etiqueta: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ),
  parrafos: PropTypes.arrayOf(PropTypes.string),
  habilidades: PropTypes.arrayOf(PropTypes.string),
};