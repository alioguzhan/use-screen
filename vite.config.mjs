/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      name: 'useScreen',
      fileName: 'index',
      formats: ['es', 'umd'],
    },
    minify: true,
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        exports: 'named',
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './lib/setupTests.ts',
    coverage: {
      include: ['lib/**'],
    },
  },
});
