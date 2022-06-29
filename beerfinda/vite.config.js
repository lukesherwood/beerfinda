import { fileURLToPath, URL } from "url";
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
//where are the views files

export default defineConfig({
  plugins: [vue(), vueJsx, Components({
    dirs: ['src']
  })],
  server: {
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
});
