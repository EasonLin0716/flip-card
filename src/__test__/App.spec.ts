import { expect, it, describe } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import { icons } from '../constants'
import App from "../App.vue";

let wrapper: VueWrapper;

describe("App", () => {
    it("should render a div element with class name 'content-memory__play-game'", () => {
        wrapper = mount(App);
        expect(wrapper.find("div").classes()).toContain(
            "content-memory__play-game"
        );
    });
    it('should have a GameTimer component', async () => {
        wrapper = mount(App);
        expect(wrapper.findComponent({ name: 'GameTimer' }).exists()).toBe(true);
    });
    it("should have correct number of GameCard component which would equal to icons.length * 2", async () => {
        wrapper = mount(App);
        // card shuffles on mounted hook
        await wrapper.vm.$nextTick();
        expect(wrapper.findAllComponents({ name: "GameCard" }).length).toBe(
            icons.length * 2
        );
    });
    it("should have a ChallengeBtn component", async() => {
        wrapper = mount(App);
        expect(wrapper.findComponent({ name: "ChallengeBtn" }).exists()).toBe(true);
    });
    it("should have a GameResultModal component", async() => {
        wrapper = mount(App);
        expect(wrapper.findComponent({ name: "GameResultModal" }).exists()).toBe(true);
    });
    it("should have a LoseGameModal component", async() => {
        wrapper = mount(App);
        expect(wrapper.findComponent({ name: "LoseGameModal" }).exists()).toBe(true);
    });
});
