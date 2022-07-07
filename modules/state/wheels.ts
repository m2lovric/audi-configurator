import { atom } from 'recoil';

export const wheels = atom({
  key: 'wheelsModel',
  default: <{ name: string; url: string; price: number }[]>[],
});
