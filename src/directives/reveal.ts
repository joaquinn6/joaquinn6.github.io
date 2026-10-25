import type { Directive } from "vue";

const HIDDEN_CLASS = "pf-reveal";
const VISIBLE_CLASS = "pf-reveal--visible";

let observer: IntersectionObserver | null = null;

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add(VISIBLE_CLASS);
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  return observer;
}

function canAnimate() {
  return (
    typeof IntersectionObserver !== "undefined" &&
    typeof window.matchMedia === "function" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Hace aparecer el elemento la primera vez que entra en pantalla. Solo oculta el contenido cuando
 * puede animarlo: sin JavaScript, sin IntersectionObserver o con movimiento reducido se ve siempre.
 */
export const reveal: Directive<HTMLElement> = {
  mounted(el) {
    if (!canAnimate()) return;
    el.classList.add(HIDDEN_CLASS);
    getObserver().observe(el);
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};
