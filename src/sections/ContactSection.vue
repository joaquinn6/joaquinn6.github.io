<script setup lang="ts">
import {
  BaseCard,
  BaseHeading,
  BaseIcon,
  BaseLink,
} from "@joaquinn6/jnv-ui-components";

import CopyEmailButton from "@/components/controls/CopyEmailButton.vue";
import ExternalLink from "@/components/controls/ExternalLink.vue";
import SectionShell from "@/components/layout/SectionShell.vue";
import { profile } from "@/data/profile";
</script>

<template>
  <SectionShell id="contact">
    <BaseCard v-reveal class="pf-contact" outlined>
      <div class="pf-contact__body">
        <BaseHeading as="p" variant="sm" color="body">
          {{ $t("contact.lead") }}
        </BaseHeading>

        <div class="pf-contact__email">
          <BaseLink
            :href="`mailto:${profile.email}`"
            size="lg"
            underline="always"
          >
            <span class="pf-icon-link">
              <BaseIcon name="mail" size="sm" decorative />
              {{ profile.email }}
            </span>
          </BaseLink>
          <CopyEmailButton :email="profile.email" />
        </div>

        <ul
          class="pf-plain-list pf-contact__links"
          :aria-label="$t('a11y.profiles')"
        >
          <li>
            <ExternalLink :href="profile.links.linkedin" icon="linkedin"
              >LinkedIn</ExternalLink
            >
          </li>
          <li>
            <ExternalLink :href="profile.links.github" icon="github"
              >GitHub</ExternalLink
            >
          </li>
        </ul>
      </div>
    </BaseCard>
  </SectionShell>
</template>

<style scoped>
.pf-contact__body {
  display: grid;
  gap: var(--space-6);
  max-width: 44rem;
}

.pf-contact__body p {
  margin: 0;
}

.pf-contact__email {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4);
  /* Correos largos no deben provocar scroll horizontal a 360 px. */
  overflow-wrap: anywhere;
}

.pf-contact__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
}
</style>
