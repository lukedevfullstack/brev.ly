import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src'],
  format: ['esm'],
  outDir: 'dist',
  clean: true,
  dts: false,
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.sql': 'file',
    };
  },
});
