import { construirMailto } from '../utils/mailto.js';

describe('construirMailto', () => {
    it('codifica asunto y cuerpo, incluyendo caracteres especiales', () => {
        const url = construirMailto('yo@example.com', { nombre: 'Ana & Co', email: 'a@b.cl', mensaje: 'Hola ¿qué tal?' });

        expect(url.startsWith('mailto:yo@example.com?subject=')).toBe(true);

        const params = new URLSearchParams(url.split('?')[1]);

        expect(params.get('subject')).toContain('Ana & Co');
        expect(params.get('body')).toContain('Hola ¿qué tal?');
        expect(params.get('body')).toContain('a@b.cl');
    });
});