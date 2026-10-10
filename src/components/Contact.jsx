import { useState } from 'react';
import PropTypes from 'prop-types';
import { validarContacto } from '../utils/validatorForm.js';
import CampoFormulario from './CampoForm.jsx';

const VALORES_INICIALES = { nombre: '', email: '', mensaje: '' };

/**
 * Formulario de contacto con validación
 *
 * @param {object} props
 * @param {(datos: {nombre: string, email: string, mensaje: string}) => void} [props.onEnviar]
 * Se llama con los datos recortados cuando el formulario es válido.
 * @param {string} [props.mensajeExito]
 */
export default function Contacto({ onEnviar = () => {}, mensajeExito = 'Mensaje enviado.' }) {
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;

    setValores((previos) => ({ ...previos, [name]: value }));

    setErrores((previos) => {
      if (!previos[name]) return previos;
      
      const resto = { ...previos };
      delete resto[name];
      return resto;
    });

    setEnviado(false);
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    const nuevosErrores = validarContacto(valores);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      setEnviado(false);
      return;
    }

    const datos = {
      nombre: valores.nombre.trim(),
      email: valores.email.trim(),
      mensaje: valores.mensaje.trim(),
    };

    onEnviar(datos);
    setValores(VALORES_INICIALES);
    setEnviado(true);
  };

  return (
    <section id="contacto" className="py-5 seccion-alterna" aria-labelledby="contacto-titulo">
      <div className="container">
        <h2 id="contacto-titulo" className="seccion-titulo text-center mb-3">
          Contacto
        </h2>

        <p className="contacto-intro text-center mx-auto mb-4">
          ¿Quieres conversar sobre un proyecto? Completa el formulario y se abrirá tu programa de
          correo con el mensaje listo para enviar.
        </p>

        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className="card shadow-sm">
              <div className="card-body p-4 p-md-5">
                <form onSubmit={manejarEnvio} noValidate>
                  <CampoFormulario
                    id="contacto-nombre"
                    name="nombre"
                    etiqueta="Nombre"
                    valor={valores.nombre}
                    onChange={manejarCambio}
                    error={errores.nombre}
                    autoComplete="name"
                  />

                  <CampoFormulario
                    id="contacto-email"
                    name="email"
                    etiqueta="Correo electrónico"
                    tipo="email"
                    valor={valores.email}
                    onChange={manejarCambio}
                    error={errores.email}
                    autoComplete="email"
                  />

                  <CampoFormulario
                    id="contacto-mensaje"
                    name="mensaje"
                    etiqueta="Mensaje"
                    multilinea
                    valor={valores.mensaje}
                    onChange={manejarCambio}
                    error={errores.mensaje}
                  />

                  <button type="submit" className="btn btn-primary w-100">
                    Enviar mensaje
                  </button>

                  {enviado && (
                    <div className="alert alert-success mt-3" role="status">
                      {mensajeExito}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Contacto.propTypes = {
  onEnviar: PropTypes.func,
  mensajeExito: PropTypes.string,
};