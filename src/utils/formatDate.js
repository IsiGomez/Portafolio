// Convierte fecha (AAAA-MM-DD) a texto legible
export function formatearFecha(iso, locale = 'es-CL') {
  const partes = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso ?? '');

  if (!partes) return '';

  const [, anio, mes, dia] = partes.map(Number);
  const fecha = new Date(anio, mes - 1, dia);
  const esValida =
    fecha.getFullYear() === anio && fecha.getMonth() === mes - 1 && fecha.getDate() === dia;

  if (!esValida) return '';

  return fecha.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
}