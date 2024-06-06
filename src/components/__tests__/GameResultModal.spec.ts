import { expect, test, describe } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import { Counter } from "../../constants";
import GameResultModal from "../GameResultModal.vue";

let wrapper: VueWrapper;

type TestGameResultModal = InstanceType<typeof GameResultModal> & {
    nickName: string;
};

describe("GameResultModal", () => {
    test('renders a section element with class name "content-modal"', () => {
        wrapper = mount(GameResultModal);
        expect(wrapper.find("section").classes()).toContain("content-modal");
    });
    test('renders success info div when resultLevel is 0', () => {
        wrapper = mount(GameResultModal);
        expect(wrapper.find(".game-result__info--success").exists()).toBe(true);
    });
    test('renders counter with current value with counter prop', async () => {
        wrapper = mount(GameResultModal);
        await wrapper.setProps({ counter: '00:00:01' as Counter });
        expect(wrapper.find(".game-result__info--success").text()).toContain('00:00:01');
    });
    test('renders nickName in input value hen nickName is passed', async () => {
        wrapper = mount(GameResultModal);
        (wrapper.vm as TestGameResultModal).nickName = 'test';
        await wrapper.vm.$nextTick();
        expect(wrapper.find('.game-result__form').find('input').element.value).toBe('test');
    });
});
