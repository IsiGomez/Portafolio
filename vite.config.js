import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { outDir: 'dist' },

  test: {
    environment: 'jsdom', // DOM simulado en Node: no abre navegador
    globals: true, // describe, it, expect y vi disponibles sin importarlos
    setupFiles: ['./src/tests/setup.js'],
    include: ['src/tests/**/*.test.{js,jsx}'],
    restoreMocks: true, // restaura fetch y otros spies antes de cada prueba

    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/main.jsx', 'src/tests/**'],
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: 'coverage',
      // Si la cobertura baja de estos mínimos, el comando falla.
      thresholds: { statements: 80, branches: 70, functions: 80, lines: 80 },
    },
  },
})
