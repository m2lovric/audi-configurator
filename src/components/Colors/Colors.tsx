import { getDownloadURL, ref } from 'firebase/storage';
import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { storage } from '../../../modules/firebase';
import { configModelsAtom } from '../../../modules/state/atoms';
import './colors.scss';

const Colors = () => {
  const modelConfig = useRecoilValue(configModelsAtom);
  console.log('modelConfig', modelConfig);
  const [colors, setColors] = useState<
    { name: string; url: string; price: number }[]
  >([]);

  useEffect(() => {
    modelConfig.colors.map((el) => {
      const starsRef = ref(storage, `color-exterior/Color=${el}.png`);

      getDownloadURL(starsRef)
        .then((url) => {
          setColors((oldArr) => [
            ...oldArr,
            {
              name: el,
              url: url,
              price: 2000,
            },
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  return (
    <section className='colors'>
      {colors
        ? colors.map((el) => {
            return (
              <article key={el.name}>
                <img src={el.url} alt='' />
                <p>{el.name}</p>
                <p>{el.price}</p>
              </article>
            );
          })
        : ''}
    </section>
  );
};

export default Colors;
