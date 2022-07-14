import { atom } from 'recoil';

export const colorsAtom = atom({
  key: 'colorsModel',
  default: <{ name: string; url: string; price: number }[]>[],
});
