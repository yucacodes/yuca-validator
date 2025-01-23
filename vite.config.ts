import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'], // Archivos de prueba que Vitest debe buscar
    environment: 'node', // Entorno de prueba (Node.js en este caso)
    coverage: {
      reporter: ['text', 'json', 'html'], // Reportes de cobertura
    },
  },
});