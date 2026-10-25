import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";

import App from "@/App.vue";
import { i18n } from "@/i18n";

function mountApp() {
  return mount(App, { global: { plugins: [i18n] }, attachTo: document.body });
}

describe("App", () => {
  beforeEach(() => {
    window.localStorage.clear();
    i18n.global.locale.value = "es";
  });

  it("renderiza un único h1 con el nombre", () => {
    const wrapper = mountApp();
    const headings = wrapper.findAll("h1");
    expect(headings).toHaveLength(1);
    expect(headings[0]?.text()).toBe("Joaquín Núñez Vega");
    wrapper.unmount();
  });

  it("alterna el tema y guarda la preferencia", async () => {
    const wrapper = mountApp();
    const root = document.documentElement;
    const toggle = wrapper.find('button[aria-label*="modo"]');
    const before = root.dataset.theme;

    await toggle.trigger("click");

    expect(root.dataset.theme).not.toBe(before);
    expect(window.localStorage.getItem("pf-theme")).toBe(root.dataset.theme);
    wrapper.unmount();
  });

  it("alterna el idioma y actualiza lang, título y textos", async () => {
    const wrapper = mountApp();
    await wrapper.find('button[aria-label^="EN"]').trigger("click");

    expect(document.documentElement.lang).toBe("en");
    expect(window.localStorage.getItem("pf-locale")).toBe("en");
    expect(wrapper.text()).toContain("Hi, I'm");
    expect(wrapper.find('a[href="/cv/cv-en.pdf"]').exists()).toBe(true);
    wrapper.unmount();
  });
});
