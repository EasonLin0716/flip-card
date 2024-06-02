import { expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import ChallengeBtn from "../ChallengeBtn.vue";

test('Renders "開始遊戲"', async () => {
  const wrapper = mount(ChallengeBtn);
  await wrapper.setProps({ playState: 0 });
  expect(wrapper.text()).toContain("開始遊戲");
});
