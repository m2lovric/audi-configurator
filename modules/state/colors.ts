import { atom } from 'recoil';

export const colors = atom({
  key: 'colorsModel',
  default: <{ name: string; url: string; price: number }[]>[],
});
