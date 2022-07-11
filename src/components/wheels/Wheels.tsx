import React from 'react';
import { useRecoilState } from 'recoil';
import cancel from '@/assets/X.png';
import { wheelsAtom, totalPriceAtom } from 'modules/state/index';
import useGetPhotos from '../getPhotos';
import useHandleCancel from './useHandleCancel';
import useWheelsChange from './useWheelsChange';

const Wheels = () => {
  const [getPhotos] = useGetPhotos();
  const [handleCancel] = useHandleCancel();
  const [onWheelChange] = useWheelsChange();
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceAtom);
  const [wheels, setWheels] =
    useRecoilState<{ name: string; url: string; price: number }[]>(wheelsAtom);

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
