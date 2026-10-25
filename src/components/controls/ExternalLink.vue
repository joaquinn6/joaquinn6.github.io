<script setup lang="ts">
import { BaseIcon, BaseLink } from "@joaquinn6/jnv-ui-components";
import type {
  BaseIconName,
  BaseIconProps,
  BaseLinkProps,
} from "@joaquinn6/jnv-ui-components";

/**
 * Enlace que se abre en una pestaña nueva y lo anuncia a los lectores de pantalla.
 * Con `label` y sin contenido funciona como enlace de solo icono.
 */
withDefaults(
  defineProps<{
    href: string;
    icon?: BaseIconName;
    iconSize?: BaseIconProps["size"];
    label?: string;
    variant?: BaseLinkProps["variant"];
    size?: BaseLinkProps["size"];
    underline?: BaseLinkProps["underline"];
  }>(),
  { iconSize: "sm", variant: "brand", size: "md", underline: "hover" },
);
</script>

<template>
  <BaseLink
    :href="href"
    target="_blank"
    :variant="variant"
    :size="size"
    :underline="underline"
    :aria-label="label ? `${label} ${$t('a11y.externalLink')}` : undefined"
  >
    <!-- El span interno alinea icono y texto sin pelear con los estilos de BaseLink. -->
    <span class="pf-icon-link">
      <BaseIcon v-if="icon" :name="icon" :size="iconSize" decorative />
      <slot />
    </span>
    <span v-if="!label" class="pf-visually-hidden">
      {{ $t("a11y.externalLink") }}
    </span>
  </BaseLink>
</template>
