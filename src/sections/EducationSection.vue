<script setup lang="ts">
import { computed } from "vue";
import { BaseText, BaseTimeline } from "@joaquinn6/jnv-ui-components";
import type { BaseTimelineItem } from "@joaquinn6/jnv-ui-components";

import SectionShell from "@/components/layout/SectionShell.vue";
import { useLocalized } from "@/composables/useLocalized";
import { education } from "@/data/education";

const { l, locale } = useLocalized();

const items = computed<BaseTimelineItem[]>(() =>
  education.map((entry) => ({
    id: entry.id,
    title: l(entry.degree),
    subtitle: entry.institution,
    start: String(entry.start),
    end: String(entry.end),
    precision: "year",
    icon: "graduationCap",
  })),
);

const statusById = new Map(education.map((entry) => [entry.id, entry.status]));

// El slot de BaseTimeline solo entrega el item genérico; aquí se recupera el estado.
function statusOf(id: string) {
  const status = statusById.get(id);
  return status ? l(status) : "";
}
</script>

<template>
  <SectionShell id="education">
    <BaseTimeline
      v-reveal
      :items="items"
      :locale="locale"
      :present-label="$t('experience.present')"
      :aria-label="$t('nav.education')"
    >
      <template #item="{ item }">
        <BaseText
          as="p"
          variant="sm"
          color="muted"
          class="pf-education__status"
        >
          {{ statusOf(item.id) }}
        </BaseText>
      </template>
    </BaseTimeline>
  </SectionShell>
</template>

<style scoped>
.pf-education__status {
  margin: var(--space-2) 0 0;
}
</style>
