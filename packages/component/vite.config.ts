import { basename, dirname, join, resolve } from 'node:path';
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
      tsconfigPath: '../../tsconfig.json',
      exclude: 'node_modules',
      staticImport: true,
      outDir: 'dist',
      include: '.',
      beforeWriteFile: (path: string, content: string) => {
        return {
          filePath: join(dirname(path).replace('src', ''), basename(path)),
          content,
        };
      },
    }),
  ],
  resolve: {
    alias: {
      '@vue-youtube/core': resolve('../core/index.ts'),
    },
  },
});