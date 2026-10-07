import { useEffect, useState } from 'react';
import { fetchJson } from '../services/dataService.js';

/**
 * Carga un JSON con `fetch` y expone su estado.
 * Si el componente se desmonta (o cambia `path`) antes de terminar, cancela la petición.
 *
 * @param {string} path
 * @returns {{data: unknown, loading: boolean, error: Error|null}}
 */
export function useJsonData(path) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    const control = new AbortController();

    setState({ data: null, loading: true, error: null });

    fetchJson(path, { signal: control.signal })
      .then((data) => {
        if (!control.signal.aborted) {
          setState({ data, loading: false, error: null });
        }
      })
      
      .catch((error) => {
        // Una petición cancelada no es un error de la carga: se ignora.
        if (!control.signal.aborted) {
          setState({ data: null, loading: false, error });
        }
      });

    return () => control.abort();
  }, [path]);

  return state;
}