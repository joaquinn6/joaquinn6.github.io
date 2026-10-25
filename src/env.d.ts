/// <reference types="vite/client" />
/// <reference types="@intlify/unplugin-vue-i18n/messages" />

import type { Directive } from "vue";

// Directivas registradas globalmente en main.ts.
declare module "vue" {
  interface GlobalDirectives {
    vReveal: Directive<HTMLElement>;
    vTooltip: Directive<HTMLElement, string>;
  }
}
