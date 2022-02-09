import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@vue-youtube/component': resolve('../packages/component/index.ts'),
      '@vue-youtube/shared': resolve('../packages/shared/index.ts'),
      '@vue-youtube/core': resolve('../packages/core/index.ts'),
    },
  },
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
});