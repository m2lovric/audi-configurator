import { Colors, ConfiguratorNav, Layout, Wheels } from '@/components';
import { db } from '@/modules/firebase';
import { modelConfig } from '@/modules/interfaces/modelConfig';
import {
  colorsAtom,
  configModelsAtom,
  interiorAtom,
  totalPriceAtom,
  userConfigurationAtom,
  visibleAtom,
  wheelsAtom,
} from '@/modules/state/index';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import useGetPhotos from '../getPhotos';
import { exteriorPhotos } from '../photosAtoms';
import './exterior.scss';

export const sides = [
  { id: 1, view: 'Front Left' },
  { id: 2, view: 'Front' },
  { id: 3, view: 'Side' },
  { id: 4, view: 'Back' },
  { id: 5, view: 'Back Left' },
];

const accessoriesState = selector({
  key: 'userInfo',
  get: ({ get }) => {
    const colorsState = get(colorsAtom);
    const wheelsState = get(wheelsAtom);

    return { colorsState, wheelsState };
  },
});

const Exterior = () => {
  const { year, model, id } = useParams();
  let modelShort = model?.split(' ')[1];

  const { colorsState, wheelsState } = useRecoilValue(accessoriesState);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceAtom);
  const setInteriorState = useSetRecoilState(interiorAtom);

  const [visible, setVisible] = useRecoilState(visibleAtom);
  const [fetched, setFetched] = useState(false);
  const setModelConfig = useSetRecoilState<modelConfig>(configModelsAtom);
  const selectedValues = useRecoilValue(userConfigurationAtom);
  const [handleGetPhotos, sortPhotos] = useGetPhotos(exteriorPhotos);
  const [photos, setPhotos] = useRecoilState(exteriorPhotos);

  useEffect(() => {
    setInteriorState([]);
    fetchData();
    setPhotos([]);

    handleGetPhotos(
      selectedValues.accessories.color.name,
      selectedValues.accessories.wheel.name,
      undefined,
      modelShort!,
      sides
    );

    sortPhotos;

    setTotalPrice(
      selectedValues.price +
        selectedValues.accessories.color.price +
        selectedValues.accessories.interior.price +
        selectedValues.accessories.wheel.price
    );
  }, [selectedValues.accessories]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'config-models'));
    querySnapshot.forEach((doc: any) => {
      doc.data().model == modelShort &&
        setModelConfig({
          ...doc.data().accessories,
          default: { ...doc.data().default },
        });
      setFetched(true);
    });
  };

  return (
    <Layout>
      <ConfiguratorNav model={model} year={year} id={id} active={'exterior'} />
      <section className='exterior'>
        <section className='exterior__slider'>
          <Splide hasTrack={false}>
            <section className='exterior__slider__container'>
              <SplideTrack>
                {photos &&
                  [...photos]
                    .sort((a, b) => a.id - b.id)
                    .map((el) => {
                      return (
                        <SplideSlide key={el.id}>
                          <img src={el.url} alt='car' />
                        </SplideSlide>
                      );
                    })}
              </SplideTrack>
            </section>
            <div className='splide__arrows'>
              <button className='splide__arrow splide__arrow--prev'>
                {'<'}
              </button>
              <div className='splide__pagination'></div>
              <button className='splide__arrow splide__arrow--next'>
                {'>'}
              </button>
            </div>
          </Splide>
        </section>
        <aside className='exterior__aside'>
          <section
            onClick={() => {
              setVisible({ ...visible, colors: true });
            }}
            style={{
              display: visible.colors || visible.wheels ? 'none' : 'block',
            }}
          >
            {colorsState
              .filter(
                (el) => el.name === `${selectedValues.accessories.color.name}`
              )
              .map((el) => {
                return (
                  <article key={el.name} className='accessories'>
                    <img src={el.url} alt='car' className='accessories__img' />
                    <section className='accessories__text'>
                      <p className='accessories__name'>{el.name}</p>
                      <p className='accessories__price'>PAINT COLOR</p>
                    </section>
                  </article>
                );
              })}
          </section>
          <section
            onClick={() => {
              setVisible({ ...visible, wheels: true });
            }}
            style={{
              display: visible.wheels || visible.colors ? 'none' : 'block',
            }}
          >
            {wheelsState
              .filter(
                (el) =>
                  el.name ===
                  `Car=${modelShort}, ${selectedValues.accessories.wheel.name}`
              )
              .map((el) => {
                return (
                  <article key={el.name} className='accessories'>
                    <img src={el.url} alt='car' className='accessories__img' />
                    <section className='accessories__text'>
                      <p className='accessories__name'>{el.name}</p>
                      <p className='accessories__price'>WHEELS</p>
                    </section>
                  </article>
                );
              })}
          </section>
          {fetched && (
            <div style={{ display: visible.colors ? 'block' : 'none' }}>
              <Colors />
            </div>
          )}
          {fetched && (
            <div style={{ display: visible.wheels ? 'block' : 'none' }}>
              <Wheels />
            </div>
          )}
          <section className='exterior__total'>
            <p className='text'>TOTAL</p>
            <p className='price'>{totalPrice} &euro;</p>
          </section>
          <Link
            to={`/configure/interior/${year}/${model}/${id}`}
            className='btn-primary-lg exterior__aside__link'
          >
            Interior
          </Link>
        </aside>
      </section>
    </Layout>
  );
};

export default Exterior;
