import { atom } from 'recoil';

export const interiorAtom = atom({
  key: 'interiorModel',
  default: <{ name: string; url: string; price: number }[]>[],
});
