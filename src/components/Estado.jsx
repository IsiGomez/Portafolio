import PropTypes from 'prop-types';
/**
 * Muestra el estado de una carga asíncrona: spinner accesible, alerta de error o el contenido.
 *
 * @param {object} props
 * @param {boolean} props.cargando Indica si la carga sigue en curso.
 * @param {Error|boolean|null} [props.error] Error de la carga (si existe se muestra la alerta).
 * @param {import('react').ReactNode} [props.children] Contenido a mostrar cuando la carga terminó bien.
 */
export default function Estado({ cargando, error, children }) {
  if (cargando) {
    return (
      <div className="text-center py-4" role="status">
        <div className="spinner-border text-primary" aria-hidden="true" />
        <span className="visually-hidden">Cargando contenido…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        No se pudo cargar este contenido. Recarga la página para intentarlo de nuevo.
      </div>
    );
  }

  return children;
}

Estado.propTypes = {
  cargando: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  children: PropTypes.node,
};