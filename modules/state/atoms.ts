import { atom } from 'recoil';
import { User } from 'firebase/auth';

export const userStateAtom = atom({
  key: 'user',
  default: false,
});
