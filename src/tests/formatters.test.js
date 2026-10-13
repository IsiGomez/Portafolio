import { formatearFecha } from '../utils/formatDate.js';

describe('formatearFecha', () => {
    it('formatea una fecha ISO en español sin desfase de día', () => {
        expect(formatearFecha('2022-03-29')).toMatch(/29.*marzo.*2022/i);
    });


    it('devuelve cadena vacía si el formato no es AAAA-MM-DD', () => {
        expect(formatearFecha('29/03/2022')).toBe('');
        expect(formatearFecha(undefined)).toBe('');
    });

    
    it('devuelve cadena vacía si la fecha no existe en el calendario', () => {
        expect(formatearFecha('2022-13-45')).toBe('');
        expect(formatearFecha('2023-02-30')).toBe('');
    });
});