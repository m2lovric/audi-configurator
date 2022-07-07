import { atom } from 'recoil';
import { User } from 'firebase/auth';

export const user = atom({
  key: 'user',
  default: <User>{},
});
