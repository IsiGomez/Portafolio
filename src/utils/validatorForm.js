// Valida la sintaxis del correo
const EMAIL_REGEX = 
/^[A-Za-z0-9_%+-]+(?:\.[A-Za-z0-9_%+-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;


// Devuelve un mapa campo
// Mensaje de error pero vacío si todo es válido
export function validarContacto({ nombre = '', email = '', mensaje = '' } = {}) {
    const errores = {};

    if (nombre.trim().length < 3) {
        errores.nombre = 'Escribe tu nombre (mínimo 3 caracteres).';
    }

    if (!EMAIL_REGEX.test(email.trim())) {
        errores.email = 'Escribe un correo válido, por ejemplo nombre@dominio.cl.';
    }

    if (mensaje.trim().length < 10) {
        errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
    }

    return errores;
}