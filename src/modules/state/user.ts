import { atom } from 'recoil';
import { User } from 'firebase/auth';

export const userAtom = atom({
  key: 'user',
  default: <User>{},
});
