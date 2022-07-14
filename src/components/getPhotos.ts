import { storage } from '@/modules/firebase';
import { configModelsAtom } from '@/modules/state';
import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

const useGetPhotos = () => {
  const modelConfig = useRecoilValue(configModelsAtom);

  const getPhotos = (type: 'colors' | 'interior' | 'wheels', setter: any) => {
    const uri = (el: any) => {
      return {
        colors: `color-exterior/Color=${el.name}.png`,
        interior: `color-interior/Color=${el.name}.png`,
        wheels: `wheels/${el.name}`,
      };
    };
    useEffect(() => {
      modelConfig?.[type].map((el) => {
        const starsRef = ref(storage, uri(el)?.[type]);

        getDownloadURL(starsRef)
          .then((url) => {
            setter((oldArr: any) => [
              ...oldArr,
              {
                name: type == 'wheels' ? el.name.split('.')[0] : el.name,
                url: url,
                price: el.price,
              },
            ]);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }, []);
  };
  return [getPhotos];
};

export default useGetPhotos;
