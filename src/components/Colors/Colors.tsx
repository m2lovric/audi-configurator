import { getDownloadURL, ref } from 'firebase/storage';
import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { storage } from '../../../modules/firebase';
import { configModelsAtom, colorsAtom } from '../../../modules/state/atoms';
import '../accessories.scss';

const Colors = () => {
  const modelConfig = useRecoilValue(configModelsAtom);
  console.log('modelConfig', modelConfig);
  const [colors, setColors] =
    useRecoilState<{ name: string; url: string; price: number }[]>(colorsAtom);

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
    <section>
      <button>X</button>
      {colors
        ? colors.map((el) => {
            return (
              <article key={el.name} className='accessories'>
                <img src={el.url} alt='' />
                <section className='accessories__text'>
                  <p className='accessories__name'>{el.name}</p>
                  <p className='accessories__price'>{el.price}</p>
                </section>
              </article>
            );
          })
        : ''}
    </section>
  );
};

export default Colors;