<script setup lang="ts">
import ExternalLink from "@/components/controls/ExternalLink.vue";
import type { Project } from "@/data/types";

/** Enlaces externos de un proyecto, compartidos por la tarjeta y el diálogo de detalle. */
defineProps<{ links: Project["links"] }>();
</script>

<template>
  <ExternalLink v-if="links.demo" :href="links.demo" icon="externalLink">
    {{ $t("projects.demo") }}
  </ExternalLink>
  <ExternalLink v-if="links.repo" :href="links.repo" icon="github">
    {{ $t("projects.code") }}
  </ExternalLink>
  <ExternalLink v-if="links.apiRepo" :href="links.apiRepo" icon="github">
    {{ $t("projects.codeApi") }}
  </ExternalLink>
  <ExternalLink v-if="links.apiDocs" :href="links.apiDocs" icon="code">
    {{ $t("projects.apiDocs") }}
  </ExternalLink>
</template>
