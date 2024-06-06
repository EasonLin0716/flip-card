import { expect, test, describe, beforeEach } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import LoseGameModal from "../LoseGameModal.vue";

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = mount(LoseGameModal);
});

describe("LoseGameModal", () => {
    test('renders a section element with class name "content-modal"', () => {
        expect(wrapper.find("section").classes()).toContain("content-modal");
    });
    test('emits "replay" when replay button is clicked', () => {
        wrapper.find("button").trigger("click");
        expect(wrapper.emitted()).toHaveProperty("replay");
    });
});