import { atom } from 'recoil';

export const visibleAtomA = atom({
  key: 'visibleModelA',
  default: { colors: false, wheels: false },
});
