import PropTypes from 'prop-types';
import { useState } from 'react';

/**
 * Barra de navegación de Bootstrap con menú colapsable controlado por estado (`useState`).
 *
 * @param {object} props
 * @param {string} props.marca 
 * @param {{id: string, etiqueta: string}[]} [props.enlaces]
 */
export default function Navbar({ marca, enlaces = [] }) {
  const [abierto, setAbierto] = useState(false);
  const cerrar = () => setAbierto(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" aria-label="Navegación principal">
      <div className="container">
        <a className="navbar-brand" href="#introduccion" onClick={cerrar}>
          {marca}
        </a>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="menu-principal"
          aria-expanded={abierto}
          aria-label="Mostrar u ocultar el menú"
          onClick={() => setAbierto((valor) => !valor)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div id="menu-principal" className={`collapse navbar-collapse${abierto ? ' show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            {enlaces.map((enlace) => (
              <li className="nav-item" key={enlace.id}>
                <a className="nav-link" href={`#${enlace.id}`} onClick={cerrar}>
                  {enlace.etiqueta}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  marca: PropTypes.string.isRequired,
  enlaces: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired, etiqueta: PropTypes.string.isRequired }),
  ),
};