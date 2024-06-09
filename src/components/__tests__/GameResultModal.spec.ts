import { expect, test, describe, vi } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import { Counter } from "../../constants";
import apis from "../../apis";
import GameResultModal from "../GameResultModal.vue";

let wrapper: VueWrapper;

type TestGameResultModal = InstanceType<typeof GameResultModal> & {
  nickName: string;
  resultLevel: number;
};

describe("GameResultModal", () => {
  test('renders a section element with class name "content-modal"', () => {
    wrapper = mount(GameResultModal);
    expect(wrapper.find("section").classes()).toContain("content-modal");
  });
  test("renders success info div when resultLevel is 0", () => {
    wrapper = mount(GameResultModal);
    expect(wrapper.find(".game-result__info--success").exists()).toBe(true);
  });
  test("renders counter with current value with counter prop", async () => {
    wrapper = mount(GameResultModal);
    await wrapper.setProps({ counter: "00:00:01" as Counter });
    expect(wrapper.find(".game-result__info--success").text()).toContain(
      "00:00:01"
    );
  });
  test("renders nickName in input value hen nickName is passed", async () => {
    wrapper = mount(GameResultModal);
    (wrapper.vm as TestGameResultModal).nickName = "test";
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".game-result__form").find("input").element.value).toBe(
      "test"
    );
  });
  test("button is disabled when nickName is empty", async () => {
    wrapper = mount(GameResultModal);
    expect(wrapper.find(".game-result__btn").classes()).contains(
      "game-result__btn--disabled"
    );
  });
  test("button is not disabled when nickName is not empty", async () => {
    wrapper = mount(GameResultModal);
    (wrapper.vm as TestGameResultModal).nickName = "test";
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".game-result__btn").classes()).not.toContain(
      "game-result__btn--disabled"
    );
  });
  test("button is loading when nickName is not empty and button is triggered", async () => {
    wrapper = mount(GameResultModal);
    (wrapper.vm as TestGameResultModal).nickName = "test";
    await wrapper.vm.$nextTick();
    await wrapper.find(".game-result__btn").trigger("click");
    expect(wrapper.find(".game-result__btn").classes()).toContain(
      "game-result__btn--loading"
    );
  });
  test("button is not responding when nickName is empty and button is clicked", async () => {
    wrapper = mount(GameResultModal);
    await wrapper.find(".game-result__btn").trigger("click");
    expect(wrapper.find(".game-result__btn").classes()).not.toContain(
      "game-result__btn--loading"
    );
  });
  test('fires "apis.getRecordLevel" and get data.level when button is clicked', async () => {
    const spy = vi.spyOn(apis, "getRecordLevel").mockImplementation(() =>
      Promise.resolve({
        data: {
          nickName: "test" as string,
          counter: "00:00:01" as string,
          level: 1 as number,
        },
      })
    );
    wrapper = mount(GameResultModal);
    (wrapper.vm as TestGameResultModal).nickName = "test";
    await wrapper.vm.$nextTick();
    await wrapper.find(".game-result__btn").trigger("click");
    expect(spy).toHaveBeenCalled();
    expect(apis.getRecordLevel).toHaveBeenCalled();
  });
  test("renders 'game-result__info__boarding' div with level when resultLevel is 1", async () => {
    const MOCK_RESULT_LEVEL = 1;
    wrapper = mount(GameResultModal);
    (wrapper.vm as TestGameResultModal).resultLevel = MOCK_RESULT_LEVEL;
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".game-result__info__boarding").text()).toContain(
      MOCK_RESULT_LEVEL
    );
  });
});
