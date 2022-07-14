import { atom } from 'recoil';
import { modelConfig } from '../interfaces/modelConfig';

export const configModelsAtom = atom({
  key: 'configModel',
  default: <modelConfig>{},
});
