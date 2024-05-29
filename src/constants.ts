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
export type GetRecordLevelRequestPayloadType = {
  nickName: string;
  counter: CounterType;
};

export const cardBackImgPath: string = "/img/card-back.png";
export const icons: CardIcon = [
  "img/chick.png",
  "img/donut.png",
  "img/heart.png",
  "img/kitty.png",
  "img/panda.png",
  "img/stars.png",
];
export const GAME_LIMIT_MINUTE: number = 5;
