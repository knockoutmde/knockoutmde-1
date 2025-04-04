import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['**/*.d.ts', '**/*.spec.ts', '**/*.test.ts', '**/setupTests.ts']
    }
  },
  resolve: {
    alias: {
      '$lib': path.resolve('./src/lib'),
      '$app': path.resolve('./src/mocks/app'),
      'svelte-i18n': path.resolve('./src/mocks/svelte-i18n.js')
    }
  },
  // Add this section to specify the test TypeScript config
  optimizeDeps: {
    include: ['@testing-library/jest-dom']
  },
  // Set the esbuild target for testing
  esbuild: {
    target: 'esnext'
  },
  // Use the tsconfig.test.json for tests
  server: {
    fs: {
      allow: ['.']
    },
  }
});
