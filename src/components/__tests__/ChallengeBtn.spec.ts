import { expect, test, describe } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import { PLAY_STATE_TEXT, PLAY_STATE } from "../../constants";
import ChallengeBtn from "../ChallengeBtn.vue";

describe("ChallengeBtn", () => {
    const wrapper: VueWrapper = mount(ChallengeBtn);
    test(`Renders ${PLAY_STATE_TEXT.NOT_STARTED}`, async () => {
        await wrapper.setProps({ playState: PLAY_STATE.NOT_STARTED });
        expect(wrapper.text()).toContain(PLAY_STATE_TEXT.NOT_STARTED);
    });
    test(`Renders ${PLAY_STATE_TEXT.PLAYING}`, async () => {
        await wrapper.setProps({ playState: PLAY_STATE.PLAYING });
        expect(wrapper.text()).toContain(PLAY_STATE_TEXT.PLAYING);
    })
});
