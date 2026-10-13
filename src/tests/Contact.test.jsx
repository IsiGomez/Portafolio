import Contacto from '../components/Contact.jsx';
import { enviarFormulario, escribir, render } from './helpers.js';

async function completar(c, { nombre, email, mensaje }) {
    await escribir(c.querySelector('#contacto-nombre'), nombre);
    await escribir(c.querySelector('#contacto-email'), email);
    await escribir(c.querySelector('#contacto-mensaje'), mensaje);
}


describe('Contacto', () => {
    it('cada campo tiene una etiqueta asociada', async () => {
        const c = await render(<Contacto />);

        ['contacto-nombre', 'contacto-email', 'contacto-mensaje'].forEach((id) => {
        expect(c.querySelector(`label[for="${id}"]`)).not.toBeNull();
        });
    });


    it('con el formulario vacío muestra errores accesibles y no envía', async () => {
        const onEnviar = vi.fn();
        const c = await render(<Contacto onEnviar={onEnviar} />);

        await enviarFormulario(c.querySelector('form'));
        expect(onEnviar).not.toHaveBeenCalled();
        expect(c.querySelectorAll('.invalid-feedback').length).toBe(3);

        const nombre = c.querySelector('#contacto-nombre');
        expect(nombre.getAttribute('aria-invalid')).toBe('true');
        expect(nombre.getAttribute('aria-describedby')).toBe('contacto-nombre-error');
    });


    it('el error de un campo desaparece al corregirlo', async () => {
        const c = await render(<Contacto />);

        await enviarFormulario(c.querySelector('form'));
        await escribir(c.querySelector('#contacto-nombre'), 'Ana');

        expect(c.querySelector('#contacto-nombre-error')).toBeNull();
        expect(c.querySelector('#contacto-email-error')).not.toBeNull();
    });


    it('con datos válidos llama a onEnviar con valores recortados, limpia el formulario y confirma', async () => {
        const onEnviar = vi.fn();
        const c = await render(<Contacto onEnviar={onEnviar} mensajeExito="Listo" />);

        await completar(c, { nombre: '  Ana  ', email: 'ana@dominio.cl', mensaje: 'Hola, este es un mensaje.' });
        await enviarFormulario(c.querySelector('form'));

        expect(onEnviar).toHaveBeenCalledTimes(1);
        expect(onEnviar).toHaveBeenCalledWith({
        nombre: 'Ana',
        email: 'ana@dominio.cl',
        mensaje: 'Hola, este es un mensaje.',
        });

        expect(c.querySelector('[role="status"]').textContent).toBe('Listo');
        expect(c.querySelector('#contacto-nombre').value).toBe('');
    });


    it('oculta la confirmación al volver a escribir', async () => {
        const c = await render(<Contacto />);

        await completar(c, { nombre: 'Ana', email: 'ana@dominio.cl', mensaje: 'Mensaje de prueba largo.' });
        await enviarFormulario(c.querySelector('form'));

        expect(c.querySelector('[role="status"]')).not.toBeNull();

        await escribir(c.querySelector('#contacto-nombre'), 'B');
        expect(c.querySelector('[role="status"]')).toBeNull();
    });
});