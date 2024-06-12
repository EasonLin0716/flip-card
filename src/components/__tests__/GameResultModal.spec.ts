import { expect, it, describe, vi } from "vitest";
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
  it('should render a section element with class name "content-modal"', () => {
    wrapper = mount(GameResultModal);
    expect(wrapper.find("section").classes()).toContain("content-modal");
  });
  it("should render success info div when resultLevel is 0", () => {
    wrapper = mount(GameResultModal);
    expect(wrapper.find(".game-result__info--success").exists()).toBe(true);
  });
  it("should render counter with current value with counter prop", async () => {
    wrapper = mount(GameResultModal);
    await wrapper.setProps({ counter: "00:00:01" as Counter });
    expect(wrapper.find(".game-result__info--success").text()).toContain(
      "00:00:01"
    );
  });
  it("should render nickName in input value hen nickName is passed", async () => {
    wrapper = mount(GameResultModal);
    (wrapper.vm as TestGameResultModal).nickName = "test";
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".game-result__form").find("input").element.value).toBe(
      "test"
    );
  });
  it("button is disabled when nickName is empty", async () => {
    wrapper = mount(GameResultModal);
    expect(wrapper.find(".game-result__btn").classes()).contains(
      "game-result__btn--disabled"
    );
  });
  it("button is not disabled when nickName is not empty", async () => {
    wrapper = mount(GameResultModal);
    (wrapper.vm as TestGameResultModal).nickName = "test";
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".game-result__btn").classes()).not.toContain(
      "game-result__btn--disabled"
    );
  });
  it("button is loading when nickName is not empty and button is triggered", async () => {
    wrapper = mount(GameResultModal);
    (wrapper.vm as TestGameResultModal).nickName = "test";
    await wrapper.vm.$nextTick();
    await wrapper.find(".game-result__btn").trigger("click");
    expect(wrapper.find(".game-result__btn").classes()).toContain(
      "game-result__btn--loading"
    );
  });
  it("button is not responding when nickName is empty and button is clicked", async () => {
    wrapper = mount(GameResultModal);
    await wrapper.find(".game-result__btn").trigger("click");
    expect(wrapper.find(".game-result__btn").classes()).not.toContain(
      "game-result__btn--loading"
    );
  });
  it('should fire "apis.getRecordLevel" and get data.level when button is clicked', async () => {
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
  it("should render 'game-result__info__boarding' div with level when resultLevel is 1", async () => {
    const MOCK_RESULT_LEVEL = 1;
    wrapper = mount(GameResultModal);
    (wrapper.vm as TestGameResultModal).resultLevel = MOCK_RESULT_LEVEL;
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".game-result__info__boarding").text()).toContain(
      MOCK_RESULT_LEVEL
    );
  });
  it("should render 'game-result__info__boarding' with other text when resultLevel is greater than 5", async () => {
    const MOCK_RESULT_LEVEL = 6;
    wrapper = mount(GameResultModal);
    (wrapper.vm as TestGameResultModal).resultLevel = MOCK_RESULT_LEVEL;
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".game-result__info__boarding").text()).toContain(
      "雖然沒進入排行榜，再挑戰一次也不錯！"
    );
  });
});
