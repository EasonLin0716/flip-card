import { expect, test, describe, beforeEach } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import { Counter } from "../../constants";
import GameTimer from "../GameTimer.vue";

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = mount(GameTimer, {
    props: { counter: "00:00.00" as Counter },
  });
});

describe("GameTimer", () => {
  test('renders a div element with class name "game-timer"', () => {
    expect(wrapper.find("div").classes()).toContain("game-timer");
  });
  test('renders a label element with text "花費時間"', () => {
    expect(wrapper.find("label").text()).toContain("花費時間");
  });
  test("renders counter prop", async () => {
    await wrapper.setProps({ counter: "01:23.45" as Counter });
    expect(wrapper.find("span.tick").text()).toEqual("01:23.45");
  });
});
