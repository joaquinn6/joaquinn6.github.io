<script setup lang="ts">
import {
  BaseDialog,
  BaseHeading,
  BaseText,
} from "@joaquinn6/jnv-ui-components";

import ProjectLinks from "@/components/projects/ProjectLinks.vue";
import TechList from "@/components/projects/TechList.vue";
import { useLocalized } from "@/composables/useLocalized";
import type { Project } from "@/data/types";

defineProps<{ project: Project; open: boolean }>();
const emit = defineEmits<{ close: [] }>();

const { l, text } = useLocalized();
</script>

<template>
  <BaseDialog
    :open="open"
    :title="text(project.name)"
    :description="l(project.tagline)"
    :close-label="$t('projects.close')"
    @close="emit('close')"
  >
    <div class="pf-project-detail">
      <section>
        <BaseHeading as="h3" variant="xs">{{
          $t("projects.problem")
        }}</BaseHeading>
        <BaseText as="p">{{ l(project.problem) }}</BaseText>
      </section>

      <section>
        <BaseHeading as="h3" variant="xs">{{
          $t("projects.solution")
        }}</BaseHeading>
        <BaseText as="p">{{ l(project.solution) }}</BaseText>
      </section>

      <section>
        <BaseHeading as="h3" variant="xs">{{
          $t("projects.highlights")
        }}</BaseHeading>
        <ul class="pf-project-detail__list">
          <BaseText
            v-for="highlight in l(project.highlights)"
            :key="highlight"
            as="li"
          >
            {{ highlight }}
          </BaseText>
        </ul>
      </section>

      <section>
        <BaseHeading as="h3" variant="xs">{{
          $t("projects.stack")
        }}</BaseHeading>
        <TechList :items="project.stack" />
      </section>
    </div>

    <template #actions>
      <ProjectLinks :links="project.links" />
    </template>
  </BaseDialog>
</template>

<style scoped>
.pf-project-detail {
  display: grid;
  gap: var(--space-6);
}

.pf-project-detail section {
  display: grid;
  gap: var(--space-2);
}

.pf-project-detail p {
  margin: 0;
}

.pf-project-detail__list {
  display: grid;
  gap: var(--space-2);
  margin: 0;
  padding-left: var(--space-5);
}
</style>
