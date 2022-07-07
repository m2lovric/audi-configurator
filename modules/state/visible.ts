import { atom } from 'recoil';

export const visible = atom({
  key: 'visibleModel',
  default: { colors: false, wheels: false },
});
