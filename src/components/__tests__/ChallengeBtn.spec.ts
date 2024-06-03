import { expect, test, describe, beforeEach } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import { PLAY_STATE_TEXT, PLAY_STATE } from "../../constants";
import ChallengeBtn from "../ChallengeBtn.vue";

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = mount(ChallengeBtn, {
    props: { playState: PLAY_STATE.NOT_STARTED },
  });
});

describe("ChallengeBtn", () => {
  test('renders a button element with class name "challenge-btn"', () => {
    expect(wrapper.find("button").classes()).toContain("challenge-btn");
  });
  test(`renders ${PLAY_STATE_TEXT.NOT_STARTED}`, async () => {
    await wrapper.setProps({ playState: PLAY_STATE.NOT_STARTED });
    expect(wrapper.text()).toContain(PLAY_STATE_TEXT.NOT_STARTED);
  });
  test(`renders ${PLAY_STATE_TEXT.PLAYING}`, async () => {
    await wrapper.setProps({ playState: PLAY_STATE.PLAYING });
    expect(wrapper.text()).toContain(PLAY_STATE_TEXT.PLAYING);
  });
  test('has class name "disabled" when playState is PLAYING', async () => {
    await wrapper.setProps({ playState: PLAY_STATE.PLAYING });
    expect(wrapper.find("button").classes()).toContain("is-disabled");
  });
  test('emits "startGame" event when clicked', async () => {
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("startGame");
  });
});
