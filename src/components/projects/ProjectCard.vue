<script setup lang="ts">
import {
  BaseButton,
  BaseCard,
  BaseHeading,
  BaseText,
} from "@joaquinn6/jnv-ui-components";

import ProjectLinks from "@/components/projects/ProjectLinks.vue";
import TechList from "@/components/projects/TechList.vue";
import { useLocalized } from "@/composables/useLocalized";
import type { Project } from "@/data/types";

defineProps<{ project: Project }>();
const emit = defineEmits<{ details: [event: MouseEvent] }>();

const { l, text } = useLocalized();
</script>

<template>
  <BaseCard
    as="article"
    class="pf-project"
    outlined
    :aria-labelledby="`project-${project.slug}`"
  >
    <div class="pf-project__body">
      <header class="pf-project__header">
        <span class="pf-eyebrow">{{ project.year }}</span>
        <BaseHeading :id="`project-${project.slug}`" as="h3" variant="md">
          {{ text(project.name) }}
        </BaseHeading>
        <BaseText as="p" color="muted">{{ l(project.tagline) }}</BaseText>
      </header>

      <BaseText as="p">{{ l(project.summary) }}</BaseText>

      <TechList :items="project.stack" :label="$t('projects.stack')" />

      <div class="pf-project__actions">
        <ProjectLinks :links="project.links" />
        <BaseButton
          class="pf-project__details"
          variant="outline"
          size="sm"
          :aria-label="$t('projects.detailsOf', { name: text(project.name) })"
          @click="emit('details', $event)"
        >
          {{ $t("projects.details") }}
        </BaseButton>
      </div>
    </div>
  </BaseCard>
</template>

<style scoped>
.pf-project {
  height: 100%;
}

.pf-project__body {
  display: grid;
  gap: var(--space-5);
}

.pf-project__header {
  display: grid;
  gap: var(--space-2);
}

.pf-project__body p {
  margin: 0;
}

.pf-project__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3) var(--space-6);
}

.pf-project__details {
  margin-left: auto;
}
</style>
