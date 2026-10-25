<script setup lang="ts">
import { BaseBadge } from "@joaquinn6/jnv-ui-components";

defineProps<{
  items: readonly string[];
  /** Nombre accesible de la lista. */
  label?: string;
}>();
</script>

<template>
  <ul class="pf-plain-list pf-tech-list" :aria-label="label">
    <li v-for="item in items" :key="item">
      <BaseBadge :label="item" width="auto" />
    </li>
  </ul>
</template>

<style scoped>
.pf-tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
</style>
