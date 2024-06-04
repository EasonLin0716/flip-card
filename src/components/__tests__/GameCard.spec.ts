import { expect, test, describe, beforeEach } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import { Card } from "../../constants";
import GameCard from "../GameCard.vue";

let wrapper: VueWrapper<any>;

beforeEach(() => {
    const card: Card = {
        icon: "icon",
        down: false,
        matched: false,
    };
    wrapper = mount(GameCard, {
        props: {
            card,
        },
    });
});

describe("GameCard", () => {
    test('renders a div element with class name "card"', () => {
        expect(wrapper.find("div").classes()).toContain("card");
    });
});