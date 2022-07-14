import { storage } from '@/modules/firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { RecoilState, useRecoilState } from 'recoil';
import { fetchedAtom } from './fetchedAtom';

const useGetPhotos = (
  type: RecoilState<
    {
      url: string;
      id: number;
    }[]
  >
) => {
  const [fetched, setFetched] = useRecoilState(fetchedAtom);
  const [photos, setPhotos] = useRecoilState(type);

  const handleGetPhotos = (
    color: string | undefined,
    wheel: string | undefined,
    interior: string | undefined,
    modelShort: string,
    sides: { id: number; view: string }[]
  ) => {
    sides.map((el) => {
      const type =
        color !== undefined
          ? `${modelShort}/Car=${modelShort}, View=${el.view}, Color=${color}, Wheel ${wheel}.png`
          : `${modelShort}/Car=${modelShort}, Color=${interior}, View=${el.view}.png`;
      const starsRef = ref(storage, type);

      getDownloadURL(starsRef)
        .then((url) => {
          setPhotos((oldArr) => [...oldArr, { url: url, id: el.id }]);
          setFetched(true);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return [handleGetPhotos];
};

export default useGetPhotos;
