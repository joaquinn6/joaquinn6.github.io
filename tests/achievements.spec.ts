import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import AchievementList from "@/components/projects/AchievementList.vue";
import { i18n } from "@/i18n";

const items = ["a", "b", "c", "d", "e", "f"];

function mountList(featured?: number) {
  return mount(AchievementList, {
    props: { items, featured },
    global: { plugins: [i18n] },
  });
}

describe("AchievementList", () => {
  it("muestra solo los destacados y un botón con la cantidad restante", async () => {
    i18n.global.locale.value = "es";
    const wrapper = mountList(4);
    const button = wrapper.find("button");

    expect(wrapper.findAll("li")).toHaveLength(4);
    expect(button.text()).toBe("Ver 2 logros más");
    expect(button.attributes("aria-expanded")).toBe("false");

    await button.trigger("click");

    expect(wrapper.findAll("li")).toHaveLength(6);
    expect(button.text()).toBe("Ver menos");
    expect(button.attributes("aria-expanded")).toBe("true");
  });

  it("sin featured muestra todo y no ofrece el botón", () => {
    const wrapper = mountList();
    expect(wrapper.findAll("li")).toHaveLength(6);
    expect(wrapper.find("button").exists()).toBe(false);
  });
});
