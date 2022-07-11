import React from 'react';
import { useRecoilState } from 'recoil';
import { interiorAtom, totalPriceAtom } from 'modules/state/index';
import '../accessories.scss';
import cancel from '../../assets/X.png';
import useGetPhotos from '../getPhotos';
import useHandleCancel from './useHandleCancel';
import useInteriorChange from './useInteriorChange';

const Colors = () => {
  const [getPhotos] = useGetPhotos();
  const [handleCancel] = useHandleCancel();
  const [onInteriorChange] = useInteriorChange();
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceAtom);

  const [interiorColors, setInteriorColors] =
    useRecoilState<{ name: string; url: string; price: number }[]>(
      interiorAtom
    );

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
