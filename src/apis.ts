import { GetRecordLevelRequestPayload } from "./constants";
type GetRecordLevelResponse = {
    data: {
        nickName: string;
        counter: string;
        level: number;
    };
}
const sleep = (n: number) => new Promise((resolve) => setTimeout(resolve, n));
const getRandomNumberByRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default {
    getRecordLevel: async (payload: GetRecordLevelRequestPayload): Promise<GetRecordLevelResponse> => {
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
