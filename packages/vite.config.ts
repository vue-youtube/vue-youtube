import { resolve, basename, dirname, join } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve('src/index.ts'),
      name: 'vue-youtube-iframe',
      fileName: format => `vue-youtube-iframe.${format}.js`,
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
      outputDir: 'dist/types/',
      exclude: 'node_modules',
      include: 'src',
      beforeWriteFile: (path: string, content: string) => {
        return {
          filePath: join(dirname(path).replace('src', ''), basename(path)),
          content,
        };
      },
    }),
  ],
});
