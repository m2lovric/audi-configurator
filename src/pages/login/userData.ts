import { atom } from 'recoil';

export const userDataAtom = atom({
  key: 'userDataLogin',
  default: { email: '', password: '' },
});
