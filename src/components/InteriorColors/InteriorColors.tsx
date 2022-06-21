import { getDownloadURL, ref } from 'firebase/storage';
import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { storage } from '../../../modules/firebase';
import {
  configModelsAtom,
  colorsAtom,
  interiorAtom,
  visibleInteriorAtom,
  userConfiguration,
} from '../../../modules/state/atoms';
import '../accessories.scss';
import cancel from '../../assets/X.png';

const Colors = () => {
  const modelConfig = useRecoilValue(configModelsAtom);

  const [interiorColors, setInteriorColors] =
    useRecoilState<{ name: string; url: string; price: number }[]>(
      interiorAtom
    );

  const [selectedValues, setSelectedValues] = useRecoilState(userConfiguration);
  const [visibleInterior, setVisibleInterior] =
    useRecoilState(visibleInteriorAtom);

  const handleCancel = () => {
    setVisibleInterior(false);
  };

  useEffect(() => {
    modelConfig.interior.map((el) => {
      const starsRef = ref(storage, `color-interior/Color=${el}.png`);

      getDownloadURL(starsRef)
        .then((url) => {
          setInteriorColors((oldArr) => [
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
      <section className='colors__heading'>
        <h3>Interior</h3>
        <button className='colors__btn' onClick={() => handleCancel()}>
          <img src={cancel} alt='cancel' />
        </button>
      </section>
      {interiorColors
        ? interiorColors.map((el) => {
            return (
              <article
                key={el.name}
                className='accessories'
                onClick={() =>
                  setSelectedValues({
                    ...selectedValues,
                    accessories: {
                      ...selectedValues.accessories,
                      interior: el.name,
                    },
                  })
                }
              >
                <img src={el.url} alt='' />
                <section className='accessories__text'>
                  <p className='accessories__name'>{el.name}</p>
                  <p className='accessories__price'>{el.price}</p>
                </section>
              </article>
            );
          })
        : ''}
      <section className='colors__total'>
        <p className='text'>TOTAL</p>
        <p className='price'>1200000&euro;</p>
      </section>
      <button className='btn-primary-lg' onClick={() => handleCancel()}>
        Done
      </button>
    </section>
  );
};

export default Colors;
