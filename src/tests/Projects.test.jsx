import Projects from '../components/Projects.jsx';
import { esperarHasta, render, simularFetch } from './helpers.js';
import { proyectosFalsos } from './fixtures.js';

async function cargar() {
  simularFetch({ 'data/projects.json': proyectosFalsos });

  const c = await render(<Projects />);

  await esperarHasta(() => c.querySelectorAll('.card').length > 0);

  return c;
}


describe('Projects', () => {
    it('carga projects.json y muestra una tarjeta por proyecto', async () => {
        const espia = simularFetch({ 'data/projects.json': proyectosFalsos });
        const c = await render(<Projects />);

        expect(c.querySelector('[role="status"]')).not.toBeNull();
        await esperarHasta(() => c.querySelectorAll('.card').length > 0);
        expect(espia).toHaveBeenCalledWith('data/projects.json', expect.anything());

        expect([...c.querySelectorAll('.card-title')].map((t) => t.textContent)).toEqual([
            'Proyecto Uno',
            'Proyecto Dos',
            'Proyecto Tres',
        ]);
    });


    it('usa la cuadrícula responsiva de Bootstrap', async () => {
        const c = await cargar();
        const col = c.querySelector('.row > div');

        ['col-12', 'col-md-6', 'col-lg-4'].forEach((clase) => expect(col.classList.contains(clase)).toBe(true));
    });


    it('muestra una alerta si el JSON no se puede cargar', async () => {
        simularFetch({ 'data/projects.json': null });

        const c = await render(<Projects />);

        await esperarHasta(() => c.querySelector('[role="alert"]') !== null);

        expect(c.querySelectorAll('.card').length).toBe(0);
    });

    
    it('informa cuando la lista está vacía', async () => {
        simularFetch({ 'data/projects.json': { proyectos: [] } });

        const c = await render(<Projects />);

        await esperarHasta(() => c.textContent.includes('Aún no hay proyectos'));
    });
});


describe('ProjectCard (renderizada por Projects)', () => {
    it('muestra imagen con alt, título y descripción', async () => {
        const c = await cargar();
        const primera = c.querySelector('.proyecto-card');

        expect(primera.querySelector('img').getAttribute('alt')).toBe('Alt 1');
        expect(primera.querySelector('.card-title').textContent).toBe('Proyecto Uno');
        expect(primera.querySelector('.card-text').textContent).toBe('Descripción 1');
    });


    it('el botón es el único enlace de la tarjeta y se abre de forma segura', async () => {
        const c = await cargar();
        const tarjetas = c.querySelectorAll('.proyecto-card');

        tarjetas.forEach((tarjeta) => expect(tarjeta.querySelectorAll('a').length).toBe(1));

        const enlace = tarjetas[0].querySelector('a');
        expect(enlace.getAttribute('href')).toBe('https://github.com/ana/uno');
        expect(enlace.getAttribute('target')).toBe('_blank');
        expect(enlace.getAttribute('rel')).toContain('noopener');
    });


    it('usa "Ver proyecto" por defecto y la etiqueta recibida si existe', async () => {
        const c = await cargar();
        const tarjetas = c.querySelectorAll('.proyecto-card');

        expect(tarjetas[0].querySelector('a').textContent).toContain('Ver proyecto');
        expect(tarjetas[1].querySelector('a').textContent).toContain('Ver repositorio');
    });

    
    it('muestra insignias solo si hay tecnologías', async () => {
        const c = await cargar();
        const tarjetas = c.querySelectorAll('.proyecto-card');

        expect(tarjetas[1].querySelectorAll('.badge-tech').length).toBe(2);
        expect(tarjetas[2].querySelector('ul')).toBeNull();
    });
});