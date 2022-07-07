import { atom } from 'recoil';

export const interior = atom({
  key: 'interiorModel',
  default: <{ name: string; url: string; price: number }[]>[],
});
