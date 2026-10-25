<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, useTemplateRef } from "vue";
import { BaseButton, BaseIcon, BaseLink } from "@joaquinn6/jnv-ui-components";

import LocaleToggle from "@/components/controls/LocaleToggle.vue";
import ThemeToggle from "@/components/controls/ThemeToggle.vue";
import SiteNav from "@/components/layout/SiteNav.vue";
import { profile } from "@/data/profile";
import type { SectionId } from "@/sections/sections";

defineProps<{ activeId: string }>();
const emit = defineEmits<{ navigate: [id: SectionId] }>();

const menuOpen = ref(false);
const header = useTemplateRef<HTMLElement>("header");
const navId = "site-nav";

function focusMenuButton() {
  header.value?.querySelector<HTMLButtonElement>(".pf-header__menu")?.focus();
}

async function closeMenu(returnFocus = false) {
  if (!menuOpen.value) return;
  menuOpen.value = false;
  if (returnFocus) {
    await nextTick();
    focusMenuButton();
  }
}

function onNavigate(id: SectionId) {
  emit("navigate", id);
  closeMenu();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") closeMenu(true);
}

// Cierra el menú móvil al tocar fuera del header.
function onPointerDown(event: PointerEvent) {
  if (menuOpen.value && !header.value?.contains(event.target as Node))
    closeMenu();
}

onMounted(() => {
  document.addEventListener("keydown", onKeydown);
  document.addEventListener("pointerdown", onPointerDown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
  document.removeEventListener("pointerdown", onPointerDown);
});
</script>

<template>
  <header ref="header" class="pf-header">
    <div class="pf-container pf-header__inner">
      <BaseLink
        class="pf-header__brand"
        href="#top"
        variant="body"
        underline="none"
        :aria-label="`${profile.name}, ${$t('a11y.home')}`"
      >
        <span aria-hidden="true">jnv<span class="pf-header__dot">.</span></span>
      </BaseLink>

      <div
        :id="navId"
        class="pf-header__nav"
        :class="{ 'pf-header__nav--open': menuOpen }"
      >
        <SiteNav :active-id="activeId" @navigate="onNavigate" />
      </div>

      <div class="pf-header__controls">
        <LocaleToggle />
        <ThemeToggle />
        <BaseButton
          class="pf-header__menu"
          variant="ghost"
          size="sm"
          :aria-label="menuOpen ? $t('a11y.closeMenu') : $t('a11y.openMenu')"
          :aria-expanded="menuOpen"
          :aria-controls="navId"
          @click="menuOpen = !menuOpen"
        >
          <BaseIcon :name="menuOpen ? 'close' : 'menu'" size="sm" decorative />
        </BaseButton>
      </div>
    </div>
  </header>
</template>

<style scoped>
.pf-header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: var(--border-width-thin) solid var(--jnv-color-border-default);
  background: var(--jnv-color-surface-page);
}

.pf-header__inner {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-4);
  min-height: var(--pf-header-height);
}

.pf-header__brand {
  font-family: var(--pf-font-mono);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
}

.pf-header__dot {
  color: var(--jnv-color-brand-primary);
}

.pf-header__controls {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  margin-left: auto;
}

/* Móvil: el menú se despliega bajo el header. */
.pf-header__nav {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  padding: var(--space-2) var(--pf-gutter) var(--space-4);
  border-bottom: var(--border-width-thin) solid var(--jnv-color-border-default);
  background: var(--jnv-color-surface-page);
}

.pf-header__nav--open {
  display: block;
}

.pf-header__nav :deep(.pf-nav__list) {
  flex-direction: column;
}

@media (min-width: 64rem) {
  .pf-header__nav {
    display: block;
    position: static;
    padding: 0;
    border: 0;
    background: none;
  }

  .pf-header__nav :deep(.pf-nav__list) {
    flex-direction: row;
  }

  .pf-header__menu {
    display: none;
  }
}
</style>
