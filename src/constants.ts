export const GAME_LIMIT_MINUTE: number = 5;
export const IMAGE_PATH: string = "/flip-card/img/";
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
export type PlayStateType = PLAY_STATE.NOT_STARTED | PLAY_STATE.PLAYING;
export type PlayStateTextType =
    | PLAY_STATE_TEXT.NOT_STARTED
    | PLAY_STATE_TEXT.PLAYING;
export type CounterType = `${string}:${string}${string}.${string}${string}`;
export type CardIconType = string[];
export type GetRecordLevelRequestPayloadType = {
    nickName: string;
    counter: CounterType;
};

export const cardBackImgPath: string = `${IMAGE_PATH}card-back.png`;
export const icons: CardIconType = [
    `${IMAGE_PATH}chick.png`,
    `${IMAGE_PATH}donut.png`,
    `${IMAGE_PATH}heart.png`,
    `${IMAGE_PATH}kitty.png`,
    `${IMAGE_PATH}panda.png`,
    `${IMAGE_PATH}stars.png`,
];