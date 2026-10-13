import App, { ENLACES } from '../App.jsx';
import { click, esperarHasta, render, simularFetch } from './helpers.js';
import { rutasCompletas } from './fixtures.js';

describe('App (integración)', () => {
    it('carga los tres JSON y compone todas las secciones', async () => {
        const espia = simularFetch(rutasCompletas);
        const c = await render(<App />);

        await esperarHasta(() => c.querySelectorAll('.proyecto-card').length === 3 && c.querySelectorAll('.noticia-card').length === 2);

        expect(espia.mock.calls.length).toBe(3);
        expect(c.querySelector('h1').textContent).toBe('Ana Prueba');

        ENLACES.forEach(({ id }) => expect(c.querySelector(`section#${id}`)).not.toBeNull());

        expect(c.querySelector('nav.navbar')).not.toBeNull();
        expect(c.querySelector('footer')).not.toBeNull();
    });


    it('si falla el perfil, muestra el error pero el resto de secciones sigue disponible', async () => {
        simularFetch({ ...rutasCompletas, 'data/profile.json': null });

        const c = await render(<App />);

        await esperarHasta(() => c.querySelectorAll('.proyecto-card').length === 3);

        expect(c.querySelector('[role="alert"]')).not.toBeNull();
        expect(c.querySelector('h1')).toBeNull();
    });

    
    it('el menú móvil se puede abrir desde la aplicación completa', async () => {
        simularFetch(rutasCompletas);

        const c = await render(<App />);

        await click(c.querySelector('.navbar-toggler'));
        expect(c.querySelector('#menu-principal').classList.contains('show')).toBe(true);
    });
});