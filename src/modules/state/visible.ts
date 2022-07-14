import { atom } from 'recoil';

export const visibleAtom = atom({
  key: 'visibleModel',
  default: { colors: false, wheels: false },
});
