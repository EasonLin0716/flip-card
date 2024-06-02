import { Card } from "../constants";

export const shuffleCards = (array: Card[]) => {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  let index = -1;
  const lastIndex = length - 1;
  const result = [...array];
  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
    const value = result[rand];
    result[rand] = result[index];
    result[index] = value;
  }
  return result;
};

export const checkMatch = (comparing: Card, compared: Card) => {
  return comparing.icon === compared.icon;
};

export const sleep = (ms: number = 2000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const zeroPrefix = (num: number, digit: number): string => {
  let zero: string = "";
  for (var i = 0; i < digit; i++) {
    zero += "0";
  }
  return (zero + num).slice(-digit);
};
