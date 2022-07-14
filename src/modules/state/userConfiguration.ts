import { atom } from 'recoil';
import { Model } from '../interfaces/model';

export const userConfigurationAtom = atom({
  key: 'userConfigModel',
  default: <Model>{
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
