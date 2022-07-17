import { interiorAtom, totalPriceAtom } from '@/modules/state/index';
import { useRecoilState, useRecoilValue } from 'recoil';
import cancel from '../../assets/X.png';
import '../accessories.scss';
import useGetPhotos from '../getPhotos';
import useHandleCancel from './useHandleCancel';
import useInteriorChange from './useInteriorChange';

const Colors = () => {
  const [getPhotos] = useGetPhotos();
  const [handleCancel] = useHandleCancel();
  const [onInteriorChange] = useInteriorChange();
  const totalPrice = useRecoilValue(totalPriceAtom);

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
      <ul>
        {interiorColors &&
          interiorColors.map((el) => {
            return (
              <li
                key={el.name}
                className='accessories'
                onClick={() => onInteriorChange(el)}
              >
                <img src={el.url} alt='' />
                <section className='accessories__text'>
                  <p className='accessories__name'>{el.name}</p>
                  <p className='accessories__price'>{el.price}</p>
                </section>
              </li>
            );
          })}
      </ul>
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
