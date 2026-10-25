import { onMounted, onUnmounted, ref } from "vue";

// Basado en playground/composables/useActiveSection.ts de jnv-ui-components.

// Eventos que indican que la persona vuelve a desplazarse por su cuenta.
const USER_SCROLL_EVENTS = ["wheel", "touchstart", "keydown"] as const;

/**
 * Devuelve el id de la sección activa: la última cuyo inicio ya pasó por debajo del header.
 * Antes de la primera sección (en el Hero) no hay ninguna activa. Al elegir una sección desde el
 * menú se fija hasta que el usuario vuelva a desplazarse, porque las secciones finales no siempre
 * pueden llegar al tope de la página.
 */
export function useActiveSection(ids: readonly string[]) {
  const activeId = ref("");
  let frame = 0;
  let locked = false;

  function readOffset() {
    const padding = parseFloat(
      getComputedStyle(document.documentElement).scrollPaddingTop,
    );
    return Number.isFinite(padding) ? padding : 80;
  }

  function update() {
    frame = 0;
    if (locked) return;

    const offset = readOffset();
    let current = "";

    for (const id of ids) {
      const element = document.getElementById(id);
      if (!element) continue;
      if (element.getBoundingClientRect().top - offset > 1) break;
      current = id;
    }

    activeId.value = current;
  }

  function scheduleUpdate() {
    if (!frame) frame = window.requestAnimationFrame(update);
  }

  function unlock() {
    if (!locked) return;
    locked = false;
    scheduleUpdate();
  }

  function setActive(id: string) {
    if (!ids.includes(id)) return;
    activeId.value = id;
    locked = true;
  }

  function syncWithHash() {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (ids.includes(id)) setActive(id);
  }

  onMounted(() => {
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("hashchange", syncWithHash);
    USER_SCROLL_EVENTS.forEach((type) =>
      window.addEventListener(type, unlock, { passive: true }),
    );

    if (window.location.hash) syncWithHash();
    else scheduleUpdate();
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", scheduleUpdate);
    window.removeEventListener("resize", scheduleUpdate);
    window.removeEventListener("hashchange", syncWithHash);
    USER_SCROLL_EVENTS.forEach((type) =>
      window.removeEventListener(type, unlock),
    );
    if (frame) window.cancelAnimationFrame(frame);
  });

  return { activeId, setActive };
}
