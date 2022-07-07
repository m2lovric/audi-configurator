import { atom } from 'recoil';
import { modelConfig } from '../interfaces/modelConfig';

export const configModels = atom({
  key: 'configModel',
  default: <modelConfig>{},
});
