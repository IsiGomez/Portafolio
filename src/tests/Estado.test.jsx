import Estado from '../components/Estado.jsx';
import { render } from './helpers.js';

describe('Estado', () => {
    it('muestra un indicador accesible mientras carga', async () => {
        const c = await render(<Estado cargando error={null}>Resultado listo</Estado>);

        expect(c.querySelector('[role="status"]')).not.toBeNull();
        expect(c.textContent).not.toContain('Resultado listo');
    });


    it('muestra una alerta si hay error', async () => {
        const c = await render(<Estado cargando={false} error={new Error('x')}>Resultado listo</Estado>);

        expect(c.querySelector('[role="alert"]')).not.toBeNull();
        expect(c.textContent).not.toContain('Resultado listo');
    });

  
    it('muestra el contenido cuando todo está listo', async () => {
        const c = await render(<Estado cargando={false} error={null}>Resultado listo</Estado>);

        expect(c.textContent).toBe('Resultado listo');
    });
});