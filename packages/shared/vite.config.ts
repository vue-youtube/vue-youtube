import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'index.ts',
      formats: ['cjs', 'es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue', '@vue-youtube/core', '@vue-youtube/shared'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    dts({
      exclude: ['node_modules', '*.config.ts'],
      tsconfigPath: '../../tsconfig.json',
      staticImport: true,
      rollupTypes: true,
      outDir: 'dist',
      include: '.',
    }),
  ],
});