<script setup lang="ts">
import { ref } from "vue";
import { BaseButton, BaseIcon, BaseToast } from "@joaquinn6/jnv-ui-components";

const props = defineProps<{ email: string }>();

const toastOpen = ref(false);
const copied = ref(false);

async function copy() {
  try {
    await navigator.clipboard.writeText(props.email);
    copied.value = true;
  } catch {
    copied.value = false;
  }
  // Reabre el aviso aunque ya estuviera visible.
  toastOpen.value = false;
  requestAnimationFrame(() => (toastOpen.value = true));
}
</script>

<template>
  <BaseButton variant="outline" size="sm" @click="copy">
    <span class="pf-copy-email">
      <BaseIcon name="copy" size="sm" decorative />
      {{ $t("contact.copyEmail") }}
    </span>
  </BaseButton>

  <BaseToast
    v-model:open="toastOpen"
    :tone="copied ? 'success' : 'danger'"
    :title="copied ? $t('contact.copied') : $t('contact.copyFailed')"
    :description="
      copied
        ? $t('contact.copiedDescription')
        : $t('contact.copyFailedDescription')
    "
    :close-label="$t('contact.closeToast')"
    :duration="4000"
    position="bottom-right"
  />
</template>

<style scoped>
.pf-copy-email {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}
</style>
