import { GetRecordLevelRequestPayloadType } from "./constants";
const sleep = (n: number) => new Promise((resolve) => setTimeout(resolve, n));

export default {
  getRecordLevel: async (payload: GetRecordLevelRequestPayloadType) => {
    await sleep(1000);
    return {
      data: {
        nickName: payload.nickName as string,
        counter: payload.counter as string,
        level: 1 as number,
      },
    };
  },
};
