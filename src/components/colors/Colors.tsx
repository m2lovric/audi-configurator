import cancel from '@/assets/X.png';
import { colorsAtom, totalPriceAtom } from '@/modules/state/index';
import { useRecoilState, useRecoilValue } from 'recoil';
import '../accessories.scss';
import useGetPhotos from '../getPhotos';
import useColorChange from './useColorChange';
import useHandleCancel from './useHandleCancel';

const Colors = () => {
  const [getPhotos] = useGetPhotos();
  const [onColorChange] = useColorChange();
  const [handleCancel] = useHandleCancel();
  const totalPrice = useRecoilValue(totalPriceAtom);

  const [colors, setColors] =
    useRecoilState<{ name: string; url: string; price: number }[]>(colorsAtom);

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
