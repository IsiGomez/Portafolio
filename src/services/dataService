export const DATA_PATHS = {
  perfil: 'data/profile.json',
  proyectos: 'data/projects.json',
  noticias: 'data/news.json',
};

/**
 * Lee un JSON; lanza un Error si la respuesta HTTP no es exitosa.
 *
 * @param {string} path
 * @param {{signal?: AbortSignal}} [opciones] `signal` permite cancelar la petición.
 * @returns {Promise<unknown>} El contenido JSON convertido a objeto.
 */

export async function fetchJson(path, { signal } = {}) {
  const response = await fetch(path, { signal });

  if (!response.ok) {
    throw new Error(`No se pudo cargar ${path} (HTTP ${response.status})`);
  }

  return response.json();
}