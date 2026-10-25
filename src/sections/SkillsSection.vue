<script setup lang="ts">
import { BaseCard } from "@joaquinn6/jnv-ui-components";

import SectionShell from "@/components/layout/SectionShell.vue";
import TechList from "@/components/projects/TechList.vue";
import { useLocalized } from "@/composables/useLocalized";
import { skills } from "@/data/skills";
import type { SkillItem } from "@/data/types";

const { l } = useLocalized();

function itemLabel(item: SkillItem) {
  return typeof item === "string" ? item : l(item);
}
</script>

<template>
  <SectionShell id="skills">
    <ul class="pf-plain-list pf-skills">
      <li v-for="group in skills" :key="group.id" v-reveal>
        <BaseCard
          class="pf-skills__card"
          :title="$t(`skills.groups.${group.id}`)"
          title-as="h3"
          padding="compact"
          outlined
        >
          <TechList :items="group.items.map(itemLabel)" />
        </BaseCard>
      </li>
    </ul>
  </SectionShell>
</template>

<style scoped>
.pf-skills {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr));
  gap: var(--space-4);
}

.pf-skills > li,
.pf-skills__card {
  height: 100%;
}
</style>
