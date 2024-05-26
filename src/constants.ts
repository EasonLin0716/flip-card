export interface Card {
  icon: string;
  down: boolean;
  matched: boolean;
}
export enum PLAY_STATE {
  NOT_STARTED = 0,
  PLAYING = 1,
}
export enum PLAY_STATE_TEXT {
  NOT_STARTED = "開始遊戲",
  PLAYING = "挑戰中...",
}
export type PlayState = PLAY_STATE.NOT_STARTED | PLAY_STATE.PLAYING;
export type PlayStateText =
  | PLAY_STATE_TEXT.NOT_STARTED
  | PLAY_STATE_TEXT.PLAYING;
export type CounterType = `${string}:${string}${string}.${string}${string}`;
export type CardIcon = string[];

export const cardBackImgPath: string = "https://fakeimg.pl/300x300/1F3A52/fff";
export const icons: CardIcon = [
  "chick.png",
  "donut.png",
  "heart.png",
  "kitty.png",
  "panda.png",
  "stars.png",
];
export const GAME_LIMIT_MINUTE: number = 5;
