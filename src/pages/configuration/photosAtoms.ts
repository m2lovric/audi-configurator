import { atom } from 'recoil';

export const interiorPhotos = atom({
  key: 'interiorPhotos',
  default: <{ url: string; id: number }[]>(<unknown>[]),
});

export const exteriorPhotos = atom({
  key: 'exteriorPhotos',
  default: <{ url: string; id: number }[]>(<unknown>[]),
});
