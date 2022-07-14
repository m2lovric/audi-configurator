import { Car } from '@/modules/interfaces/car';
import { atom } from 'recoil';

export const modelsAtom = atom({
  key: 'models',
  default: <Car[]>(<unknown>[]),
});
