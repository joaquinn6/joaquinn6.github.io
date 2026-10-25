<script setup lang="ts">
import { computed } from "vue";
import { BaseTimeline } from "@joaquinn6/jnv-ui-components";
import type { BaseTimelineItem } from "@joaquinn6/jnv-ui-components";

import SectionShell from "@/components/layout/SectionShell.vue";
import AchievementList from "@/components/projects/AchievementList.vue";
import TechList from "@/components/projects/TechList.vue";
import { useLocalized } from "@/composables/useLocalized";
import { experience } from "@/data/experience";
import type { ExperienceItem } from "@/data/types";

const { l, locale } = useLocalized();

const items = computed<BaseTimelineItem[]>(() =>
  experience.map((job) => ({
    id: job.id,
    title: l(job.role),
    subtitle: job.company,
    start: job.start,
    end: job.end,
    icon: "briefcase",
  })),
);

const byId = new Map(experience.map((job) => [job.id, job]));

// El slot de BaseTimeline solo entrega el item genérico; aquí se recupera el dato completo.
function jobOf(id: string): ExperienceItem {
  const job = byId.get(id);
  if (!job) throw new Error(`Experiencia desconocida: ${id}`);
  return job;
}
</script>

<template>
  <SectionShell id="experience">
    <BaseTimeline
      v-reveal
      :items="items"
      :locale="locale"
      :present-label="$t('experience.present')"
      :aria-label="$t('nav.experience')"
    >
      <template #item="{ item }">
        <div class="pf-experience__details">
          <AchievementList
            :items="l(jobOf(item.id).achievements)"
            :featured="jobOf(item.id).featured"
            :label="$t('experience.achievements')"
          />
          <TechList
            :items="jobOf(item.id).stack"
            :label="$t('experience.stack')"
          />
        </div>
      </template>
    </BaseTimeline>
  </SectionShell>
</template>

<style scoped>
.pf-experience__details {
  display: grid;
  gap: var(--space-4);
  max-width: 48rem;
  margin-top: var(--space-3);
}
</style>
