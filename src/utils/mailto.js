// Arma el enlace mailto del formulario
export function construirMailto(destinatario, { nombre, email, mensaje }) {
  const asunto = encodeURIComponent(`Contacto desde el portafolio: ${nombre}`);
  const cuerpo = encodeURIComponent(`${mensaje}\n\n${nombre} (${email})`);

  return `mailto:${destinatario}?subject=${asunto}&body=${cuerpo}`;
}
