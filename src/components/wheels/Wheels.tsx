import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { storage } from 'modules/firebase';
import cancel from '@/assets/X.png';
import {
  configModelsAtom,
  wheelsAtom,
  visibleAtom,
  visibleAtomA,
  userConfigurationAtom,
  totalPriceAtom,
} from 'modules/state/index';
import useGetPhotos from '../getPhotos';

const Wheels = () => {
  const [getPhotos] = useGetPhotos();
  const modelConfig = useRecoilValue(configModelsAtom);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceAtom);
  const [selectedValues, setSelectedValues] = useRecoilState(
    userConfigurationAtom
  );
  const [wheels, setWheels] =
    useRecoilState<{ name: string; url: string; price: number }[]>(wheelsAtom);

  const [visible, setVisible] = useRecoilState(visibleAtom);
  const [visibleA, setVisibleA] = useRecoilState(visibleAtomA);

  const handleCancel = () => {
    setVisible({ ...visible, wheels: false });
    setVisibleA({ ...visibleA, wheels: false });
  };

  const onWheelChange = (el: { name: string; url: string; price: number }) => {
    const currentWheelPrice = selectedValues.accessories.wheel.price;
    setSelectedValues({
      ...selectedValues,
      accessories: {
        ...selectedValues.accessories,
        wheel: { name: el.name.split(' ')[1], price: el.price },
      },
    });
    setTotalPrice(totalPrice - currentWheelPrice + el.price);
  };

  getPhotos('wheels', setWheels);

  return (
    <section className='colors'>
      <section className='colors__heading'>
        <h3>Wheels</h3>
        <button className='colors__btn' onClick={handleCancel}>
          <img src={cancel} alt='cancel' />
        </button>
      </section>

      {wheels &&
        wheels.map((el) => {
          return (
            <article
              key={el.name}
              className='accessories'
              onClick={() => onWheelChange(el)}
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
        <p>TOTAL</p>
        <p>{totalPrice}&euro;</p>
      </section>
      <button className='btn-primary-lg' onClick={handleCancel}>
        Done
      </button>
    </section>
  );
};

export default Wheels;
