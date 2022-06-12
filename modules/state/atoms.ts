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

export const colorsAtom = atom({
  key: 'colorsModel',
  default: <{ name: string; url: string; price: number }[]>[],
});

export const wheelsAtom = atom({
  key: 'wheelsModel',
  default: <{ name: string; url: string; price: number }[]>[],
});

export const interiorAtom = atom({
  key: 'interiorModel',
  default: <{ name: string; url: string; price: number }[]>[],
});

export const visibleAtom = atom({
  key: 'visibleModel',
  default: { colors: false, wheels: false },
});

export const visibleAtomA = atom({
  key: 'visibleModelA',
  default: { colors: false, wheels: false },
});
