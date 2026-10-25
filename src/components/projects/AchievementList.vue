<script setup lang="ts">
import { computed, ref, useId } from "vue";
import { BaseButton, BaseIcon, BaseText } from "@joaquinn6/jnv-ui-components";

const props = defineProps<{
  items: readonly string[];
  /** Cuántos elementos se muestran siempre. Sin valor se muestran todos. */
  featured?: number;
  label?: string;
}>();

const expanded = ref(false);
const listId = `achievements-${useId()}`;

const visibleCount = computed(() =>
  props.featured === undefined ? props.items.length : props.featured,
);
const hiddenCount = computed(() =>
  Math.max(props.items.length - visibleCount.value, 0),
);
const visible = computed(() =>
  expanded.value ? props.items : props.items.slice(0, visibleCount.value),
);
</script>

<template>
  <div class="pf-achievements">
    <ul :id="listId" class="pf-achievements__list" :aria-label="label">
      <BaseText v-for="item in visible" :key="item" as="li">
        {{ item }}
      </BaseText>
    </ul>

    <BaseButton
      v-if="hiddenCount > 0"
      class="pf-achievements__toggle"
      variant="ghost"
      size="sm"
      :aria-expanded="expanded"
      :aria-controls="listId"
      @click="expanded = !expanded"
    >
      <span class="pf-icon-link">
        <BaseIcon
          name="chevronDown"
          size="sm"
          decorative
          class="pf-achievements__chevron"
          :class="{ 'pf-achievements__chevron--up': expanded }"
        />
        {{
          expanded
            ? $t("experience.showLess")
            : $t("experience.showMore", { count: hiddenCount })
        }}
      </span>
    </BaseButton>
  </div>
</template>

<style scoped>
.pf-achievements {
  display: grid;
  justify-items: start;
  gap: var(--space-3);
}

.pf-achievements__list {
  display: grid;
  gap: var(--space-2);
  margin: 0;
  padding-left: var(--space-5);
}

.pf-achievements__chevron {
  transition: transform var(--transition-fast);
}

.pf-achievements__chevron--up {
  transform: rotate(180deg);
}
</style>
