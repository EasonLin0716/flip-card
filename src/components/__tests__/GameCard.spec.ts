import { expect, it, describe, beforeEach } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import { Card, cardBackImgPath } from "../../constants";
import GameCard from "../GameCard.vue";

const MOCK_ICON = "testIcon.svg";

let wrapper: VueWrapper<any>;

beforeEach(() => {
  const card: Card = {
    icon: MOCK_ICON,
    down: true,
    matched: false,
  };
  wrapper = mount(GameCard, {
    props: {
      card,
    },
  });
});

describe("GameCard", () => {
  it('should render a div element with class name "card"', () => {
    expect(wrapper.find("div").classes()).toContain("card");
  });
  it('should show class name "down" when card.down is true', async () => {
    expect(wrapper.find("div").classes()).toContain("down");
  });
  it('should show class name "matched" when card.up is true', async () => {
    await wrapper.setProps({ card: { ...wrapper.props().card, down: false } });
    expect(wrapper.find("div").classes()).toContain("up");
  });
  it('should show class name "matched" when card.matched is true', async () => {
    await wrapper.setProps({
      card: { ...wrapper.props().card, matched: true },
    });
    expect(wrapper.find("div").classes()).toContain("matched");
  });
  it(`should render an img element with src equal to ${cardBackImgPath} when card.down is true`, () => {
    expect(wrapper.find("img").attributes("src")).toBe(cardBackImgPath);
  });
  it("should render an img element with src equal to MOCK_ICON when card.down is false", async () => {
    await wrapper.setProps({ card: { ...wrapper.props().card, down: false } });
    expect(wrapper.find("img").attributes("src")).toBe(MOCK_ICON);
  });
  it("should emit 'cardClick' event when clicked", async () => {
    await wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("cardClick");
  });
});
