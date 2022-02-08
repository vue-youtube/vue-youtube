import { basename, dirname, join } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'index.ts',
      name: 'VueYoutube',
      formats: ['cjs', 'es'],
      fileName: format => `vue-youtube.${format === 'cjs' ? 'cjs' : 'mjs'}`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    dts({
      exclude: 'node_modules',
      staticImport: true,
      outputDir: 'dist',
      include: '.',
      beforeWriteFile: (path: string, content: string) => {
        return {
          filePath: join(dirname(path).replace('src', ''), basename(path)),
          content,
        };
      },
    }),
  ],
});