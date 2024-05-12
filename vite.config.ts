import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['es', "cjs", "iife", "umd"],
      name: "VueFetch"
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          Vue: 'vue',
        },
      },
    }
  },

  resolve: { alias: { '@/': resolve('src/') } },
  plugins: [dts({ rollupTypes: true })]
});
