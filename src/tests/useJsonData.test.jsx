import { render as renderRTL } from '@testing-library/react';
import { useJsonData } from '../hooks/useJsonData.js';
import { esperarHasta, render, simularFetch } from './helpers.js';

function Sonda({ ruta }) {
  const { data, loading, error } = useJsonData(ruta);

  if (loading) return <p>cargando</p>;

  if (error) return <p>error: {error.message}</p>;

  return <p>dato: {data.valor}</p>;
}


describe('useJsonData', () => {
  it('pasa de "cargando" a los datos recibidos', async () => {
    simularFetch({ 'data/a.json': { valor: 42 } });

    const contenedor = await render(<Sonda ruta="data/a.json" />);

    expect(contenedor.textContent).toBe('cargando');

    await esperarHasta(() => contenedor.textContent !== 'cargando');

    expect(contenedor.textContent).toBe('dato: 42');
  });


  it('expone el error cuando la carga falla', async () => {
    simularFetch({ 'data/a.json': null });

    const contenedor = await render(<Sonda ruta="data/a.json" />);

    await esperarHasta(() => contenedor.textContent !== 'cargando');

    expect(contenedor.textContent).toContain('error:');
    expect(contenedor.textContent).toContain('500');
  });

  
  it('cancela la petición al desmontar el componente', async () => {
    const espia = simularFetch({ 'data/a.json': { valor: 1 } });

    const { unmount } = renderRTL(<Sonda ruta="data/a.json" />);
    const { signal } = espia.mock.calls[0][1];

    expect(signal.aborted).toBe(false);

    unmount();

    expect(signal.aborted).toBe(true);
  });
});