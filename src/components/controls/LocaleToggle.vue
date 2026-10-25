<script setup lang="ts">
import { BaseButton, BaseIcon } from "@joaquinn6/jnv-ui-components";

import { useLocale } from "@/composables/useLocale";

const { toggleLocale } = useLocale();
</script>

<template>
  <!-- El nombre accesible empieza con el texto visible (WCAG 2.5.3). -->
  <BaseButton
    variant="ghost"
    size="sm"
    :aria-label="$t('locale.switchTo')"
    @click="toggleLocale"
  >
    <span class="pf-locale-toggle">
      <BaseIcon name="languages" size="sm" decorative />
      {{ $t("locale.target") }}
    </span>
  </BaseButton>
</template>

<style scoped>
.pf-locale-toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--pf-font-mono);
}
</style>
