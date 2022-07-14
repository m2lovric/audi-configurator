import { atom } from 'recoil';

export const wheelsAtom = atom({
  key: 'wheelsModel',
  default: <{ name: string; url: string; price: number }[]>[],
});
