<script setup lang="ts">
import { BaseLink } from "@joaquinn6/jnv-ui-components";

defineProps<{ target: string }>();
</script>

<template>
  <BaseLink class="pf-skip-link" :href="`#${target}`" underline="always">
    {{ $t("a11y.skipToContent") }}
  </BaseLink>
</template>

<style scoped>
.pf-skip-link {
  position: fixed;
  top: var(--space-2);
  left: var(--space-2);
  z-index: 100;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-sm);
  background: var(--jnv-color-surface-page);
  transform: translateY(calc(-100% - var(--space-4)));
}

.pf-skip-link:focus-visible {
  transform: none;
}
</style>
