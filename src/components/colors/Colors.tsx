import { getDownloadURL, ref } from 'firebase/storage';
import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { storage } from 'modules/firebase';
import {
  configModelsAtom,
  colorsAtom,
  visibleAtom,
  visibleAtomA,
  userConfigurationAtom,
  totalPriceAtom,
} from 'modules/state/index';
import '../accessories.scss';
import cancel from '@/assets/X.png';
import useGetPhotos from '../getPhotos';

const Colors = () => {
  const [getPhotos] = useGetPhotos();
  const modelConfig = useRecoilValue(configModelsAtom);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceAtom);

  const [visible, setVisible] = useRecoilState(visibleAtom);
  const [visibleA, setVisibleA] = useRecoilState(visibleAtomA);

  const [selectedValues, setSelectedValues] = useRecoilState(
    userConfigurationAtom
  );
  const [colors, setColors] =
    useRecoilState<{ name: string; url: string; price: number }[]>(colorsAtom);

  const handleCancel = () => {
    setVisible({ ...visible, colors: false });
    setVisibleA({ ...visibleA, colors: false });
  };

  const onColorChange = (el: { name: string; url: string; price: number }) => {
    const currentColorPrice = selectedValues.accessories.color.price;
    setSelectedValues({
      ...selectedValues,
      accessories: {
        ...selectedValues.accessories,
        color: { name: el.name, price: el.price },
      },
    });

    setTotalPrice(totalPrice - currentColorPrice + el.price);
  };

  getPhotos('colors', setColors);

  return (
    <section className='colors'>
      <section className='colors__heading'>
        <h3>Paint color</h3>
        <button className='colors__btn' onClick={handleCancel}>
          <img src={cancel} alt='cancel' />
        </button>
      </section>
      {colors &&
        colors.map((el) => {
          return (
            <article
              key={el.name}
              className='accessories'
              onClick={() => onColorChange(el)}
            >
              <img src={el.url} alt='' />
              <section className='accessories__text'>
                <p className='accessories__name'>{el.name}</p>
                <p className='accessories__price'>{el.price}</p>
              </section>
            </article>
          );
        })}

      <section className='colors__total'>
        <p className='text'>TOTAL</p>
        <p className='price'>{totalPrice} &euro;</p>
      </section>

      <button className='btn-primary-lg' onClick={handleCancel}>
        Done
      </button>
    </section>
  );
};

export default Colors;
