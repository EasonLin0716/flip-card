export const GAME_LIMIT_MINUTE: number = 5;
export const IMAGE_PATH: string = "/flip-card/img/";
export enum PLAY_STATE {
  NOT_STARTED = 0,
  PLAYING = 1,
}
export enum PLAY_STATE_TEXT {
  NOT_STARTED = "開始遊戲",
  PLAYING = "挑戰中...",
}
export type Card = {
  icon: string;
  down: boolean;
  matched: boolean;
};
export type PlayState = PLAY_STATE.NOT_STARTED | PLAY_STATE.PLAYING;
export type PlayStateText =
  | PLAY_STATE_TEXT.NOT_STARTED
  | PLAY_STATE_TEXT.PLAYING;
export type Counter = `${string}:${string}${string}.${string}${string}`;
export type CardIcon = string[];
export type GetRecordLevelRequestPayload = {
  nickName: string;
  counter: Counter;
};
export type GetRecordLevelResponse = {
  data: {
    nickName: string;
    counter: string;
    level: number;
  };
};

export const cardBackImgPath: string = `${IMAGE_PATH}card-back.png`;
export const icons: CardIcon = [
  `${IMAGE_PATH}chick.png`,
  `${IMAGE_PATH}donut.png`,
  `${IMAGE_PATH}heart.png`,
  `${IMAGE_PATH}kitty.png`,
  `${IMAGE_PATH}panda.png`,
  `${IMAGE_PATH}stars.png`,
];
