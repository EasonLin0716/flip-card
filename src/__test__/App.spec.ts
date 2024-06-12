import { expect, test, describe, beforeEach } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import App from "../App.vue";

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = mount(App);
});

test("renders a div element with class name 'content-memory__play-game'", () => {
  expect(wrapper.find("div").classes()).toContain("content-memory__play-game");
});
