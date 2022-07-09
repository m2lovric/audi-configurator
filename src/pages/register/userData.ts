import { atom } from 'recoil';

export const userDataAtom = atom({
  key: 'userDataRegister',
  default: { name: '', email: '', password: '' },
});
