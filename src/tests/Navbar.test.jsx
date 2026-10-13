import Navbar from '../components/Navbar.jsx';
import { click, render } from './helpers.js';

const enlaces = [
    { id: 'proyectos', etiqueta: 'Proyectos' },
    { id: 'noticias', etiqueta: 'Noticias' },
];


describe('Navbar', () => {
    it('renderiza la marca y un enlace ancla por sección', async () => {
        const c = await render(<Navbar marca="Mi marca" enlaces={enlaces} />);

        expect(c.querySelector('.navbar-brand').textContent).toBe('Mi marca');

        const hrefs = [...c.querySelectorAll('.nav-link')].map((a) => a.getAttribute('href'));
        expect(hrefs).toEqual(['#proyectos', '#noticias']);
    });


    it('el botón alterna el menú y actualiza aria-expanded', async () => {
        const c = await render(<Navbar marca="M" enlaces={enlaces} />);
        const boton = c.querySelector('.navbar-toggler');
        const menu = c.querySelector('#menu-principal');

        expect(boton.getAttribute('aria-expanded')).toBe('false');
        expect(menu.classList.contains('show')).toBe(false);

        await click(boton);
        expect(boton.getAttribute('aria-expanded')).toBe('true');
        expect(menu.classList.contains('show')).toBe(true);

        await click(boton);
        expect(menu.classList.contains('show')).toBe(false);
    });


    it('cierra el menú al elegir un enlace', async () => {
        const c = await render(<Navbar marca="M" enlaces={enlaces} />);

        await click(c.querySelector('.navbar-toggler'));
        await click(c.querySelector('.nav-link'));

        expect(c.querySelector('#menu-principal').classList.contains('show')).toBe(false);
    });


    it('cierra el menú al pulsar la marca', async () => {
        const c = await render(<Navbar marca="M" enlaces={enlaces} />);

        await click(c.querySelector('.navbar-toggler'));
        await click(c.querySelector('.navbar-brand'));

        expect(c.querySelector('#menu-principal').classList.contains('show')).toBe(false);
    });


    it('funciona sin enlaces', async () => {
        const c = await render(<Navbar marca="M" />);

        expect(c.querySelectorAll('.nav-link').length).toBe(0);
    });
});