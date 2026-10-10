import PropTypes from 'prop-types';

/**
 * Campo de formulario
 *
 * @param {object} props
 * @param {string} props.id Id del campo (enlaza etiqueta, campo y mensaje de error).
 * @param {string} [props.name] Nombre (id).
 * @param {string} props.etiqueta Texto
 * @param {string} [props.tipo] de <input>
 * @param {boolean} [props.multilinea] true usa <textarea>
 * @param {number} [props.filas] del `<textarea>`.
 * @param {string} props.valor
 * @param {(evento: import('react').ChangeEvent) => void} props.onChange Se llama al escribir.
 * @param {string} [props.error] Mensaje de error / invalido
 * @param {string} [props.autoComplete] Valor del autocomplete.
 */

export default function CampoFormulario({
  id,
  name = id,
  etiqueta,
  tipo = 'text',
  multilinea = false,
  filas = 4,
  valor,
  onChange,
  error,
  autoComplete,
}) {
  const errorId = `${id}-error`;

  const comunes = {
    id,
    name,
    value: valor,
    onChange,
    autoComplete,
    className: `form-control${error ? ' is-invalid' : ''}`,
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': error ? errorId : undefined,
  };

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {etiqueta}
      </label>

      {multilinea ? <textarea rows={filas} {...comunes} /> : <input type={tipo} {...comunes} />}

      {error && (
        <div id={errorId} className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
}

CampoFormulario.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  etiqueta: PropTypes.string.isRequired,
  tipo: PropTypes.string,
  multilinea: PropTypes.bool,
  filas: PropTypes.number,
  valor: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  autoComplete: PropTypes.string,
};