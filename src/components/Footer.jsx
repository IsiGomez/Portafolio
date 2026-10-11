import PropTypes from 'prop-types';

/**
 * Pie de página: copyright e íconos de redes sociales.
 *
 * @param {object} props
 * @param {string} [props.nombre] en el copyright.
 * @param {{id: string, etiqueta: string, url: string}[]} [props.redes] Redes sociales.
 * @param {number} [props.anio]
*/

export default function Footer({ nombre, redes = [], anio = new Date().getFullYear() }) {
  return (
    <footer className="py-4 bg-dark text-light">
        <div className="container text-center">
            <p className="fs-6 mb-0">
                © {anio} {nombre}. Hecho con React y Bootstrap.
            </p>

            {redes.length > 0 && (
            <nav aria-label="Redes sociales" className="mt-3">
                <ul className="redes justify-content-center">
                    {redes.map((red) => (
                        <li key={red.id}>
                            <a
                                className="footer-red"
                                href={red.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${red.etiqueta} (se abre en una pestaña nueva)`}
                            >
                                <i className={`bi bi-${red.id}`} aria-hidden="true" />
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            )}
        </div>
    </footer>
  );
}

Footer.propTypes = {
    nombre: PropTypes.string,
    redes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            etiqueta: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }),
    ),
    anio: PropTypes.number,
};