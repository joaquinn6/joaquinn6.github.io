<script setup lang="ts">
import { BaseLink } from "@joaquinn6/jnv-ui-components";

import { SECTION_IDS, type SectionId } from "@/sections/sections";

defineProps<{ activeId: string }>();
const emit = defineEmits<{ navigate: [id: SectionId] }>();
</script>

<template>
  <nav class="pf-nav" :aria-label="$t('a11y.mainNav')">
    <ul class="pf-plain-list pf-nav__list">
      <li v-for="id in SECTION_IDS" :key="id">
        <BaseLink
          class="pf-nav__link"
          :class="{ 'pf-nav__link--active': activeId === id }"
          :href="`#${id}`"
          variant="body"
          size="sm"
          underline="none"
          :aria-current="activeId === id ? 'true' : undefined"
          @click="emit('navigate', id)"
        >
          {{ $t(`nav.${id}`) }}
        </BaseLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.pf-nav__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.pf-nav__link {
  display: block;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  color: var(--jnv-color-text-muted);
}

.pf-nav__link:hover,
.pf-nav__link--active {
  color: var(--jnv-color-text-heading);
}

.pf-nav__link--active {
  background: var(--jnv-color-surface-muted);
}
</style>
