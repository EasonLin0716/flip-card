import { GetRecordLevelRequestPayloadType } from "./constants";
const sleep = (n: number) => new Promise((resolve) => setTimeout(resolve, n));
const getRandomNumberByRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default {
  getRecordLevel: async (payload: GetRecordLevelRequestPayloadType) => {
    await sleep(1000);
    return {
      data: {
        nickName: payload.nickName as string,
        counter: payload.counter as string,
        level: getRandomNumberByRange(1, 10) as number,
      },
    };
  },
};
