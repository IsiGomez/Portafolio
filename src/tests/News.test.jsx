import News from '../components/News.jsx';
import { esperarHasta, render, simularFetch } from './helpers.js';
import { noticiasFalsas } from './fixtures.js';

describe('News', () => {
    it('carga news.json y muestra dos secciones con sus noticias', async () => {
        const espia = simularFetch({ 'data/news.json': noticiasFalsas });
        const c = await render(<News />);

        expect(c.querySelector('[role="status"]')).not.toBeNull();
        await esperarHasta(() => c.querySelectorAll('article').length > 0);

        expect(espia).toHaveBeenCalledWith('data/news.json', expect.anything());
        expect([...c.querySelectorAll('h3')].map((h) => h.textContent)).toEqual(['Sección A', 'Sección B']);
        expect(c.querySelectorAll('article').length).toBe(2);
    });


    it('muestra una alerta si falla la carga', async () => {
        simularFetch({ 'data/news.json': null });

        const c = await render(<News />);

        await esperarHasta(() => c.querySelector('[role="alert"]') !== null);

        expect(c.querySelectorAll('article').length).toBe(0);
    });


    it('muestra un mensaje cuando una sección no tiene noticias', async () => {
        simularFetch({ 'data/news.json': { secciones: [{ id: 'v', titulo: 'Vacía', noticias: [] }] } });

        const c = await render(<News />);

        await esperarHasta(() => c.textContent.includes('No hay noticias'));
    });


    it('muestra la fecha legible en <time> y conserva el texto original si no es válida', async () => {
        simularFetch({
            'data/news.json': {
                secciones: [
                    {
                        id: 's',
                        titulo: 'S',
                        noticias: [
                            { id: 'a', titulo: 'Con fecha', fecha: '2024-01-15', contenido: 'C' },
                            { id: 'b', titulo: 'Sin fecha', fecha: 'pronto', contenido: 'C' },
                        ],
                    },
                ],
            },
        });

        const c = await render(<News />);

        await esperarHasta(() => c.querySelectorAll('time').length === 2);

        const fechas = c.querySelectorAll('time');

        expect(fechas[0].getAttribute('datetime')).toBe('2024-01-15');
        expect(fechas[0].textContent).toMatch(/15.*enero.*2024/i);
        expect(fechas[1].textContent).toBe('pronto');
    });

    
    it('muestra "Leer más" con enlace seguro solo si la noticia trae enlace', async () => {
        simularFetch({
            'data/news.json': {
                secciones: [
                    {
                        id: 's',
                        titulo: 'S',
                        noticias: [
                            { id: 'a', titulo: 'Con enlace', fecha: '2024-01-15', contenido: 'C', enlace: 'https://ejemplo.cl/n' },
                            { id: 'b', titulo: 'Sin enlace', fecha: '2024-01-16', contenido: 'C' },
                        ],
                    },
                ],
            },
        });

        const c = await render(<News />);

        await esperarHasta(() => c.querySelectorAll('article').length === 2);

        const enlaces = c.querySelectorAll('a');

        expect(enlaces.length).toBe(1);
        expect(enlaces[0].getAttribute('href')).toBe('https://ejemplo.cl/n');
        expect(enlaces[0].getAttribute('target')).toBe('_blank');
        expect(enlaces[0].getAttribute('rel')).toContain('noopener');
        expect(enlaces[0].textContent).toContain('Leer más');
    });
});