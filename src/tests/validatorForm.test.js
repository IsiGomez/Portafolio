import { validarContacto } from '../utils/validatorForm.js';

describe('validarContacto', () => {
    const valido = { nombre: 'Ana', email: 'ana@dominio.cl', mensaje: 'Hola, quiero contactarte.' };

    it('no devuelve errores con datos válidos', () => {
        expect(validarContacto(valido)).toEqual({});
    });


    it('devuelve un error por cada campo vacío', () => {
        expect(Object.keys(validarContacto({})).sort()).toEqual(['email', 'mensaje', 'nombre']);
    });


    it('rechaza correos sin formato válido', () => {
        ['ana', 'ana@', 'ana@dominio', 'a na@dominio.cl'].forEach((email) => {
            expect(validarContacto({ ...valido, email }).email).toBeDefined();
        });
    });


    it('rechaza correos con estructura inválida aunque tengan @ y punto', () => {
        ['@frfdf.cl', 'a@b.c', 'a@b..cl', 'a@-b.cl', 'a@b-.cl', 'a@b.cl.', 'a..b@x.cl', '.a@x.cl', 'a@x.c1'].forEach((email) => {
            expect(validarContacto({ ...valido, email }).email, email).toBeDefined();
        });
    });


    it('acepta correos válidos habituales', () => {
        ['ana@dominio.cl', 'nombre.apellido@duocuc.cl', 'ana+portafolio@mail.dominio.com', 'a_b-c@x-y.co'].forEach((email) => {
            expect(validarContacto({ ...valido, email }).email, email).toBeUndefined();
        });
    });

    
    it('ignora espacios al inicio y al final', () => {
        expect(validarContacto({ ...valido, nombre: ' A ' }).nombre).toBeDefined();
        expect(validarContacto({ ...valido, mensaje: '   corto   ' }).mensaje).toBeDefined();
    });
});