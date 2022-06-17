import { atom } from 'recoil';
import { User } from 'firebase/auth';

import { modelConfigI } from '../interfaces/index';

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

export const visibleInteriorAtom = atom({
  key: 'visibleInteriorModel',
  default: false,
});

export const userConfiguration = atom({
  key: 'userConfigModel',
  default: <
    {
      model?: string;
      accessories: { color: string; interior: string; wheel: string };
    }
  >{
    model: 'RS5',
    accessories: {
      color: 'Turbo Blue',
      interior: 'Black&grey',
      wheel: 'Style=One',
    },
  },
});
