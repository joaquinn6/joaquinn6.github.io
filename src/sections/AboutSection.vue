<script setup lang="ts">
import { BaseCard, BaseText } from "@joaquinn6/jnv-ui-components";

import SectionShell from "@/components/layout/SectionShell.vue";
import { useLocalized } from "@/composables/useLocalized";
import { profile } from "@/data/profile";

const { l } = useLocalized();
</script>

<template>
  <SectionShell id="about">
    <div class="pf-about">
      <div v-reveal class="pf-about__text">
        <BaseText v-for="paragraph in l(profile.about)" :key="paragraph" as="p">
          {{ paragraph }}
        </BaseText>
      </div>

      <ul
        v-reveal
        class="pf-plain-list pf-about__highlights"
        :aria-label="$t('about.highlights')"
      >
        <li v-for="highlight in profile.highlights" :key="highlight.value.es">
          <BaseCard padding="compact" outlined>
            <p class="pf-about__value">{{ l(highlight.value) }}</p>
            <BaseText as="p" variant="sm" color="muted">
              {{ l(highlight.label) }}
            </BaseText>
          </BaseCard>
        </li>
      </ul>
    </div>
  </SectionShell>
</template>

<style scoped>
.pf-about {
  display: grid;
  gap: var(--space-8);
}

.pf-about__text {
  display: grid;
  gap: var(--space-4);
  max-width: 42rem;
}

.pf-about__text p,
.pf-about__highlights p {
  margin: 0;
}

.pf-about__highlights {
  display: grid;
  gap: var(--space-4);
}

.pf-about__value {
  font-family: var(--pf-font-mono);
  font-size: var(--font-size-xl);
  color: var(--jnv-color-brand-primary);
}

@media (min-width: 64rem) {
  .pf-about {
    grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
    align-items: start;
  }
}
</style>
