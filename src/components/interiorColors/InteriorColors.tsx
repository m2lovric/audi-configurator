import { getDownloadURL, ref } from 'firebase/storage';
import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { storage } from 'modules/firebase';
import {
  configModelsAtom,
  interiorAtom,
  visibleInteriorAtom,
  userConfigurationAtom,
  totalPriceAtom,
} from 'modules/state/index';
import '../accessories.scss';
import cancel from '../../assets/X.png';
import useGetPhotos from '../getPhotos';

const Colors = () => {
  const [getPhotos] = useGetPhotos();
  const modelConfig = useRecoilValue(configModelsAtom);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceAtom);

  const [interiorColors, setInteriorColors] =
    useRecoilState<{ name: string; url: string; price: number }[]>(
      interiorAtom
    );

  const [selectedValues, setSelectedValues] = useRecoilState(
    userConfigurationAtom
  );
  const [visibleInterior, setVisibleInterior] =
    useRecoilState(visibleInteriorAtom);

  const handleCancel = () => {
    setVisibleInterior(false);
  };

  const onInteriorChange = (el: {
    name: string;
    url: string;
    price: number;
  }) => {
    const currentInteriorPrice = selectedValues.accessories.interior.price;
    setSelectedValues({
      ...selectedValues,
      accessories: {
        ...selectedValues.accessories,
        interior: { name: el.name, price: el.price },
      },
    });
    setTotalPrice(totalPrice - currentInteriorPrice + el.price);
  };

  getPhotos('interior', setInteriorColors);

  return (
    <section className='colors'>
      <section className='colors__heading'>
        <h3>Interior</h3>
        <button className='colors__btn' onClick={handleCancel}>
          <img src={cancel} alt='cancel' />
        </button>
      </section>
      {interiorColors &&
        interiorColors.map((el) => {
          return (
            <article
              key={el.name}
              className='accessories'
              onClick={() => onInteriorChange(el)}
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
        <p className='price'>{totalPrice}&euro;</p>
      </section>
      <button className='btn-primary-lg' onClick={handleCancel}>
        Done
      </button>
    </section>
  );
};

export default Colors;
