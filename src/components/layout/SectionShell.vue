<script setup lang="ts">
import { computed } from "vue";
import { BaseHeading } from "@joaquinn6/jnv-ui-components";

import { SECTION_IDS, type SectionId } from "@/sections/sections";

const props = defineProps<{ id: SectionId }>();

const number = computed(() =>
  String(SECTION_IDS.indexOf(props.id) + 1).padStart(2, "0"),
);
</script>

<template>
  <section :id="id" class="pf-section" :aria-labelledby="`${id}-title`">
    <div class="pf-container">
      <header v-reveal class="pf-section__header">
        <span class="pf-eyebrow" aria-hidden="true">{{ number }}.</span>
        <BaseHeading :id="`${id}-title`" as="h2" variant="lg">
          {{ $t(`nav.${id}`) }}
        </BaseHeading>
      </header>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.pf-section {
  padding-block: calc(var(--pf-section-gap) / 2);
}

.pf-section__header {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
}

@media (min-width: 48rem) {
  .pf-section {
    padding-block: calc(var(--pf-section-gap) / 1.5);
  }
}
</style>
