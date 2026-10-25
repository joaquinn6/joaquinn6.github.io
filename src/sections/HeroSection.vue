<script setup lang="ts">
import {
  BaseBadge,
  BaseHeading,
  BaseIcon,
  BaseLink,
  BaseText,
} from "@joaquinn6/jnv-ui-components";

import ExternalLink from "@/components/controls/ExternalLink.vue";
import { useLocalized } from "@/composables/useLocalized";
import { profile } from "@/data/profile";

const { l } = useLocalized();
</script>

<template>
  <section class="pf-hero" aria-labelledby="hero-title">
    <div class="pf-container pf-hero__inner">
      <BaseBadge
        tone="success"
        size="md"
        width="auto"
        :label="$t('hero.available')"
      />

      <div class="pf-hero__intro">
        <p class="pf-eyebrow">{{ $t("hero.greeting") }}</p>
        <BaseHeading id="hero-title" as="h1" variant="hero">
          {{ profile.name }}
        </BaseHeading>
        <BaseText as="p" variant="xl" color="muted">
          {{ $t("hero.role") }}
        </BaseText>
      </div>

      <BaseText as="p" class="pf-hero__tagline">
        {{ l(profile.tagline) }}
      </BaseText>

      <div class="pf-hero__actions">
        <BaseLink href="#projects" size="lg" underline="always">
          {{ $t("hero.ctaProjects") }}
        </BaseLink>
        <BaseLink
          :href="l(profile.cv)"
          size="lg"
          underline="always"
          download
          type="application/pdf"
        >
          <span class="pf-icon-link">
            <BaseIcon name="download" size="sm" decorative />
            {{ $t("hero.ctaCv") }} ({{ $t("hero.cvFormat") }})
          </span>
        </BaseLink>
      </div>

      <ul
        class="pf-plain-list pf-hero__profiles"
        :aria-label="$t('a11y.profiles')"
      >
        <li>
          <ExternalLink
            :href="profile.links.github"
            icon="github"
            icon-size="md"
            label="GitHub"
            variant="muted"
          />
        </li>
        <li>
          <ExternalLink
            :href="profile.links.linkedin"
            icon="linkedin"
            icon-size="md"
            label="LinkedIn"
            variant="muted"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.pf-hero__inner {
  display: grid;
  justify-items: start;
  gap: var(--space-6);
  padding-block: var(--space-12) calc(var(--pf-section-gap) / 2);
}

.pf-hero__intro {
  display: grid;
  gap: var(--space-2);
}

.pf-hero__intro .pf-eyebrow {
  margin: 0;
}

.pf-hero__tagline {
  max-width: 40rem;
}

.pf-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4) var(--space-8);
}

.pf-hero__profiles {
  display: flex;
  gap: var(--space-2);
  /* Compensa el padding para alinear el primer icono con el texto. */
  margin-left: calc(var(--space-2) * -1);
}

/* Área táctil de 40 px alrededor de cada icono. */
.pf-hero__profiles :deep(a) {
  display: inline-flex;
  padding: var(--space-2);
}

@media (min-width: 48rem) {
  .pf-hero__inner {
    padding-block: calc(var(--pf-section-gap) * 0.75) var(--pf-section-gap);
  }
}
</style>
