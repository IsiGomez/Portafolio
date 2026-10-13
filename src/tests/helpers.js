// Utilidades de prueba sobre React Testing Library (RTL) y user-event.
import { act, cleanup as limpiarRTL, fireEvent, render as renderRTL, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

// Monta un elemento y devuelve su contenedor
export async function render(ui) {
    const { container } = renderRTL(ui);

    // Deja resolver los efectos iniciales (ejem: el primer render de un hook).
    await act(async () => {});

    return container;
}


export function cleanup() {
    limpiarRTL();
}


export async function click(elemento) {
    await userEvent.click(elemento);
}


export async function escribir(campo, valor) {
    await userEvent.click(campo);
    await userEvent.clear(campo);

    if (valor) {
        await userEvent.paste(valor)
    };
}


export async function enviarFormulario(formulario) {
    fireEvent.submit(formulario);
    await act(async () => {});
}


export async function esperarHasta(condicion, tiempoMaximo = 2000) {
    await waitFor(
        () => {
            if (!condicion()) throw new Error('esperarHasta: tiempo agotado');
        },
        { timeout: tiempoMaximo },
    );
}


// Simula fetch: `rutas` mapea el final de la URL a su JSON (null = HTTP 500; ausente = 404).
export function simularFetch(rutas) {
  // Solo evita un error si falta.
    if (typeof globalThis.fetch !== 'function') {
        globalThis.fetch = async () => ({ ok: false, status: 0, json: async () => ({}) });
    }

    return vi.spyOn(globalThis, 'fetch').mockImplementation(async (url) => {
        await new Promise((resolver) => setTimeout(resolver, 20));

        const clave = Object.keys(rutas).find((ruta) => String(url).endsWith(ruta));

        if (clave === undefined) {
            return { ok: false, status: 404, json: async () => ({}) }
        };
        if (rutas[clave] === null) {
            return { ok: false, status: 500, json: async () => ({}) }
        };

        return { ok: true, status: 200, json: async () => rutas[clave] };
    });
}