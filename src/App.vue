<script setup lang="ts">
import SiteFooter from "@/components/layout/SiteFooter.vue";
import SiteHeader from "@/components/layout/SiteHeader.vue";
import SkipLink from "@/components/layout/SkipLink.vue";
import { useActiveSection } from "@/composables/useActiveSection";
import AboutSection from "@/sections/AboutSection.vue";
import ContactSection from "@/sections/ContactSection.vue";
import EducationSection from "@/sections/EducationSection.vue";
import ExperienceSection from "@/sections/ExperienceSection.vue";
import HeroSection from "@/sections/HeroSection.vue";
import ProjectsSection from "@/sections/ProjectsSection.vue";
import { SECTION_IDS } from "@/sections/sections";
import SkillsSection from "@/sections/SkillsSection.vue";

const { activeId, setActive } = useActiveSection(SECTION_IDS);
</script>

<template>
  <div id="top">
    <SkipLink target="main" />
    <SiteHeader :active-id="activeId" @navigate="setActive" />
    <main id="main" tabindex="-1">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
main:focus {
  outline: none;
}
</style>
