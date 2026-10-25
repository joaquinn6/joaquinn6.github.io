import { createApp } from "vue";
import { tooltip } from "@joaquinn6/jnv-ui-components";

import "@fontsource-variable/inter/wght.css";
import "@fontsource/jetbrains-mono/latin-400.css";

// Orden: estilos de la librería → temas JNV de respaldo → tema del portafolio → base.
import "@joaquinn6/jnv-ui-components/styles.css";
import "@joaquinn6/jnv-ui-components/themes/jnv.css";
import "@joaquinn6/jnv-ui-components/themes/jnv-light.css";
import "./styles/theme/portfolio.css";
import "./styles/base.css";

import App from "./App.vue";
import { reveal } from "./directives/reveal";
import { i18n } from "./i18n";

createApp(App)
  .use(i18n)
  .directive("tooltip", tooltip)
  .directive("reveal", reveal)
  .mount("#app");
