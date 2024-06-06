import { expect, test, describe, beforeEach } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import GameResultModal from "../GameResultModal.vue";

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = mount(GameResultModal);
});

describe("GameResultModal", () => {
    test('renders a section element with class name "content-modal"', () => {
        expect(wrapper.find("section").classes()).toContain("content-modal");
    });
});
