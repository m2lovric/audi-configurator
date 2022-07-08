import { atom } from 'recoil';

export const userDataAtom = atom({
  key: 'userDataAtom',
  default: { email: '', password: '' },
});
