import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['esm'],
  target: 'esnext',
  splitting: true,
  dts: true,
  clean: true,
  shims: false,
  external: [/@vue-youtube/],
});
