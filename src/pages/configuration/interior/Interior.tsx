import { ConfiguratorNav, InteriorColors, Layout } from '@/components';
import {
  colorsAtom,
  interiorAtom,
  totalPriceAtom,
  userConfigurationAtom,
  visibleInteriorAtom,
  wheelsAtom,
} from '@/modules/state/index';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import '../exterior/exterior.scss';
import { fetchedAtom } from '../fetchedAtom';
import useGetPhotos from '../getPhotos';
import { interiorPhotos } from '../photosAtoms';
const Interior = () => {
  const { year, model, id } = useParams();
  let modelShort = model?.split(' ')[1];

  const sides = [
    { id: 1, view: 'Dash' },
    { id: 2, view: 'Seats' },
  ];

  const totalPrice = useRecoilValue(totalPriceAtom);
  const interiorState = useRecoilValue(interiorAtom);
  const setColorState = useSetRecoilState(colorsAtom);
  const setWheelsState = useSetRecoilState(wheelsAtom);
  const [visibleInterior, setVisibleInterior] =
    useRecoilState(visibleInteriorAtom);
  const fetched = useRecoilValue(fetchedAtom);
  const selectedValues = useRecoilValue(userConfigurationAtom);
  const [handleGetPhotos, sortPhotos] = useGetPhotos(interiorPhotos);
  const [photos, setPhotos] = useRecoilState(interiorPhotos);

  useEffect(() => {
    setColorState([]);
    setWheelsState([]);
    setPhotos([]);

    handleGetPhotos(
      undefined,
      undefined,
      selectedValues.accessories.interior.name,
      modelShort!,
      sides
    );
    sortPhotos;
  }, [selectedValues.accessories]);

  return (
    <Layout>
      <ConfiguratorNav model={model} year={year} id={id} active={'interior'} />
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
              setVisibleInterior(true);
            }}
            style={{
              display: visibleInterior ? 'none' : 'block',
            }}
          >
            {interiorState
              .filter(
                (el) => el.name === selectedValues.accessories.interior.name
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

          {fetched && (
            <div style={{ display: visibleInterior ? 'block' : 'none' }}>
              <InteriorColors />
            </div>
          )}

          <section className='exterior__total'>
            <p className='text'>TOTAL</p>
            <p className='price'>{totalPrice} &euro;</p>
          </section>
          <Link
            to={`/configure/summary/${year}/${model}/${id}`}
            className='btn-primary-lg exterior__aside__link'
          >
            Summary
          </Link>
        </aside>
      </section>
    </Layout>
  );
};

export default Interior;
