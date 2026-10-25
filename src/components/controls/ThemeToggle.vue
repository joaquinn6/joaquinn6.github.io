<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { BaseButton, BaseIcon } from "@joaquinn6/jnv-ui-components";

import { useTheme } from "@/composables/useTheme";

const { t } = useI18n();
const { isDark, toggleTheme } = useTheme();

const label = computed(() =>
  isDark.value ? t("theme.toLight") : t("theme.toDark"),
);
</script>

<template>
  <BaseButton
    v-tooltip="label"
    variant="ghost"
    size="sm"
    :aria-label="label"
    @click="toggleTheme"
  >
    <BaseIcon :name="isDark ? 'sun' : 'moon'" size="sm" decorative />
  </BaseButton>
</template>
