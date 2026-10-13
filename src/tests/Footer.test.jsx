import Footer from '../components/Footer.jsx';
import { perfilFalso as p } from './fixtures.js';
import { render } from './helpers.js';

describe('Footer', () => {
    it('muestra el nombre y el año recibido', async () => {
        const c = await render(<Footer nombre="Ana" anio={2030} />);

        expect(c.textContent).toContain('2030');
        expect(c.textContent).toContain('Ana');
    });


    it('usa el año actual por defecto', async () => {
        const c = await render(<Footer nombre="Ana" />);

        expect(c.textContent).toContain(String(new Date().getFullYear()));
    });


    it('muestra un ícono por red con enlace seguro y nombre accesible', async () => {
        const c = await render(<Footer nombre="Ana" redes={p.redes} />);
        const enlaces = [...c.querySelectorAll('nav a')];

        expect(enlaces.map((a) => a.getAttribute('href'))).toEqual(p.redes.map((r) => r.url));

        enlaces.forEach((a, i) => {
            expect(a.getAttribute('target')).toBe('_blank');
            expect(a.getAttribute('rel')).toContain('noopener');
            expect(a.getAttribute('aria-label')).toContain(p.redes[i].etiqueta);
            expect(a.querySelector('i').className).toContain(`bi-${p.redes[i].id}`);
        });
    });

    
    it('no dibuja la navegación de redes si no hay redes', async () => {
        const c = await render(<Footer nombre="Ana" />);

        expect(c.querySelector('nav')).toBeNull();
    });
});