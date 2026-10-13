import { DATA_PATHS, fetchJson } from '../services/dataService.js';
import { simularFetch } from './helpers.js';

describe('dataService', () => {
    it('expone rutas relativas a los tres archivos JSON', () => {
        Object.values(DATA_PATHS).forEach((ruta) => {
            expect(ruta.startsWith('/')).toBe(false);
            expect(ruta.endsWith('.json')).toBe(true);
        });
    });


    it('fetchJson devuelve el JSON parseado', async () => {
        const espia = simularFetch({ 'data/x.json': { ok: true } });

        await expect(fetchJson('data/x.json')).resolves.toEqual({ ok: true });

        expect(espia).toHaveBeenCalledWith('data/x.json', { signal: undefined });
    });


    it('fetchJson rechaza con el código HTTP cuando la respuesta no es exitosa', async () => {
        simularFetch({ 'data/x.json': null });

        await expect(fetchJson('data/x.json')).rejects.toThrow(/HTTP 500/);
    });


    it('fetchJson propaga los errores de red', async () => {
        vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('sin conexión'));

        await expect(fetchJson('data/x.json')).rejects.toThrow('sin conexión');
    });


    it('fetchJson envía la señal de cancelación a fetch', async () => {
        const espia = simularFetch({ 'data/x.json': { ok: true } });
        const control = new AbortController();

        await fetchJson('data/x.json', { signal: control.signal });

        expect(espia).toHaveBeenCalledWith('data/x.json', { signal: control.signal });
    });
});