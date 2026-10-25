import { fileURLToPath, URL } from "node:url";

import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Sitio de usuario de GitHub Pages: se sirve en la raíz del dominio.
  base: "/",
  plugins: [
    vue(),
    // Precompila los mensajes JSON: en producción solo viaja el runtime de vue-i18n.
    VueI18nPlugin({
      include: fileURLToPath(new URL("./src/i18n/locales/**", import.meta.url)),
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: false,
      strictMessage: true,
      escapeHtml: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    include: ["tests/**/*.spec.ts"],
  },
});
