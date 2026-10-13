import AboutMe from '../components/AboutMe.jsx';
import { render } from './helpers.js';

const props = {
    nombre: 'Ana Prueba',
    titular: 'Desarrolladora de prueba',
    bio: 'Bio de prueba.',
    foto: 'img/foto.png',
    fotoAlt: 'Retrato de Ana',
    redes: [
        { id: 'github', etiqueta: 'GitHub', url: 'https://github.com/ana' },
        { id: 'linkedin', etiqueta: 'LinkedIn', url: 'https://linkedin.com/in/ana' },
    ],
    parrafos: ['Primer párrafo.', 'Segundo párrafo.'],
    habilidades: ['React', 'Java'],
};


describe('AboutMe', () => {
    it('muestra nombre, titular, bio y foto con texto alternativo', async () => {
        const c = await render(<AboutMe {...props} />);

        expect(c.querySelector('h1').textContent).toBe('Ana Prueba');
        expect(c.querySelector('.hero-titular').textContent).toBe('Desarrolladora de prueba');
        expect(c.querySelector('.hero-bio').textContent).toBe('Bio de prueba.');
        expect(c.querySelector('img').getAttribute('alt')).toBe('Retrato de Ana');
    });


    it('crea un enlace seguro con su ícono por cada red social', async () => {
        const c = await render(<AboutMe {...props} />);
        const enlaces = c.querySelectorAll('a[target="_blank"]');

        expect(enlaces.length).toBe(2);
        expect(enlaces[0].getAttribute('href')).toBe('https://github.com/ana');
        expect(enlaces[0].getAttribute('rel')).toContain('noopener');
        expect(enlaces[0].querySelector('i').classList.contains('bi-github')).toBe(true);
        expect(enlaces[1].querySelector('i').classList.contains('bi-linkedin')).toBe(true);
    });


    it('renderiza un párrafo por texto y una insignia por habilidad', async () => {
        const c = await render(<AboutMe {...props} />);

        expect(c.querySelectorAll('.sobre-mi-texto p').length).toBe(2);
        expect(c.querySelectorAll('.badge-tech').length).toBe(2);
    });


    it('omite titular, bio, redes y listas cuando no se entregan', async () => {
        const c = await render(<AboutMe nombre="Ana" />);

        expect(c.querySelector('.hero-titular')).toBeNull();
        expect(c.querySelector('.hero-bio')).toBeNull();
        expect(c.querySelectorAll('a[target="_blank"]').length).toBe(0);
        expect(c.querySelectorAll('.badge-tech').length).toBe(0);
    });
});