import { atom } from 'recoil';
import { User } from 'firebase/auth';

import { modelConfigI } from '../../src/pages/Configuration/Exterior';

export const userStateAtom = atom({
  key: 'user',
  default: false,
});

export const configModelsAtom = atom({
  key: 'configModel',
  default: <modelConfigI>{},
});
