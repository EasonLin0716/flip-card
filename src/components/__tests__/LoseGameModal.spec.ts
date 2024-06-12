import { expect, it, describe, beforeEach } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import LoseGameModal from "../LoseGameModal.vue";

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = mount(LoseGameModal);
});

describe("LoseGameModal", () => {
  it('should render a section element with class name "content-modal"', () => {
    expect(wrapper.find("section").classes()).toContain("content-modal");
  });
  it('should emit "replay" when replay button is clicked', () => {
    wrapper.find("button").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("replay");
  });
});
