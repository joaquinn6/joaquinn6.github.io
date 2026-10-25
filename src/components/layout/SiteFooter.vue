<script setup lang="ts">
import { BaseText } from "@joaquinn6/jnv-ui-components";

import ExternalLink from "@/components/controls/ExternalLink.vue";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const year = new Date().getFullYear();
const libraryRepo = projects.find(
  (project) => project.slug === "components-vue-3",
)?.links.repo;
</script>

<template>
  <footer class="pf-footer">
    <div class="pf-container pf-footer__inner">
      <BaseText as="p" variant="sm" color="muted">
        © {{ year }} {{ profile.name }}
      </BaseText>
      <BaseText as="p" variant="sm" color="muted">
        {{ $t("footer.madeWith") }}
        <ExternalLink
          v-if="libraryRepo"
          :href="libraryRepo"
          variant="muted"
          size="sm"
        >
          {{ $t("footer.library") }}
        </ExternalLink>
        ·
        <ExternalLink :href="profile.links.source" variant="muted" size="sm">
          {{ $t("footer.source") }}
        </ExternalLink>
      </BaseText>
    </div>
  </footer>
</template>

<style scoped>
.pf-footer {
  border-top: var(--border-width-thin) solid var(--jnv-color-border-default);
  background: var(--jnv-color-surface-footer);
}

.pf-footer__inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-2) var(--space-6);
  padding-block: var(--space-8);
}

.pf-footer__inner p {
  margin: 0;
}
</style>
