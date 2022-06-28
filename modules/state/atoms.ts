import { User } from 'firebase/auth';
import { atom } from 'recoil';
import { modelConfigI, modelI } from '../interfaces/index';

export const userStateAtom = atom({
  key: 'user',
  default: false,
});

export const userAtom = atom({
  key: 'userAtom',
  default: <User>{},
});

export const userIdAtom = atom({
  key: 'userIdAtom',
  default: '',
});

export const selectModelAtom = atom({
  key: 'selectModel',
  default: <any>[],
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
  default: <modelI>{
    model: '',
    accessories: {
      color: { name: '', price: 0 },
      interior: { name: '', price: 0 },
      wheel: { name: 'Style=One', price: 0 },
    },
    fullName: '',
    price: 70000,
    year: 2022,
  },
});

export const totalPriceAtom = atom({
  key: 'totalPrice',
  default: 0,
});
