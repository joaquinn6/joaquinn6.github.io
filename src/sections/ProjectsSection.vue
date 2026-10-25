<script setup lang="ts">
import { nextTick, ref, shallowRef } from "vue";

import SectionShell from "@/components/layout/SectionShell.vue";
import ProjectCard from "@/components/projects/ProjectCard.vue";
import ProjectDetailDialog from "@/components/projects/ProjectDetailDialog.vue";
import { projects } from "@/data/projects";
import type { Project } from "@/data/types";

const selected = shallowRef<Project | null>(null);
const open = ref(false);
let trigger: HTMLElement | null = null;

function showDetails(project: Project, event: MouseEvent) {
  trigger =
    event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
  selected.value = project;
  open.value = true;
}

// Al cerrar, el foco vuelve al botón que abrió el diálogo.
async function closeDetails() {
  open.value = false;
  await nextTick();
  trigger?.focus();
  trigger = null;
}
</script>

<template>
  <SectionShell id="projects">
    <ul class="pf-plain-list pf-projects">
      <li v-for="project in projects" :key="project.slug" v-reveal>
        <ProjectCard
          :project="project"
          @details="showDetails(project, $event)"
        />
      </li>
    </ul>

    <ProjectDetailDialog
      v-if="selected"
      :project="selected"
      :open="open"
      @close="closeDetails"
    />
  </SectionShell>
</template>

<style scoped>
.pf-projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 22rem), 1fr));
  gap: var(--space-6);
}
</style>
