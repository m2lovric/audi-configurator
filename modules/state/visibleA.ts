import { atom } from 'recoil';

export const visibleA = atom({
  key: 'visibleModelA',
  default: { colors: false, wheels: false },
});
