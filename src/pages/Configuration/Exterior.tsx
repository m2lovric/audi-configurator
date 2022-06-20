import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout, ConfiguratorNav, Colors, Wheels } from '../../components';
import { db, storage } from '../../../modules/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import './exterior.scss';
import { collection, getDocs } from 'firebase/firestore';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  colorsAtom,
  configModelsAtom,
  wheelsAtom,
  visibleAtom,
  visibleAtomA,
  userConfiguration,
  interiorAtom,
} from '../../../modules/state/atoms';
import { modelConfigI } from '../../../modules/interfaces';

export const sides = [
  { id: 1, view: 'Front Left' },
  { id: 2, view: 'Front' },
  { id: 3, view: 'Side' },
  { id: 4, view: 'Back' },
  { id: 5, view: 'Back Left' },
];

const Exterior = () => {
  const { year, model } = useParams();
  let modelShort = model?.split(' ')[1];

  const [colorsState, setColorState] = useRecoilState(colorsAtom);
  const [wheelsState, setWheelsState] = useRecoilState(wheelsAtom);
  const [interiorState, setInteriorState] = useRecoilState(interiorAtom);

  const [visibleA, setVisibleA] = useRecoilState(visibleAtomA);
  const [visible, setVisible] = useRecoilState(visibleAtom);
  const [photos, setPhotos] = useState<{ url: string; id: number }[]>([]);
  const [fetched, setFetched] = useState(false);
  const [modelConfig, setModelConfig] =
    useRecoilState<modelConfigI>(configModelsAtom);

  const [selectedValues, setSelectedValues] = useRecoilState(userConfiguration);

  useEffect(() => {
    setModel();
    fetchData();
    setInteriorState([]);
    setPhotos([]);

    sides.map((el) => {
      const starsRef = ref(
        storage,
        `${modelShort}/Car=${modelShort}, View=${el.view}, Color=${selectedValues.accessories.color}, Wheel ${selectedValues.accessories.wheel}.png`
      );

      getDownloadURL(starsRef)
        .then((url) => {
          setPhotos((oldArr) => [...oldArr, { url: url, id: el.id }]);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, [selectedValues.accessories]);

  const setModel = () => {
    setSelectedValues({
      ...selectedValues,
      model: modelShort,
      fullName: model,
    });
  };

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'config-models'));
    querySnapshot.forEach((doc: any) => {
      doc.data().model == modelShort
        ? setModelConfig({
            ...doc.data().accessories,
            default: { ...doc.data().default },
          })
        : '';
      setFetched(true);
    });
  };

  return (
    <Layout>
      <ConfiguratorNav model={model} year={year} active={'exterior'} />
      <section className='exterior'>
        <section className='exterior__slider'>
          <Splide hasTrack={false}>
            <section className='exterior__slider__container'>
              <SplideTrack>
                {photos
                  ? photos
                      .sort((a, b) => a.id - b.id)
                      .map((el) => {
                        return (
                          <SplideSlide key={el.id}>
                            <img src={el.url} alt='car' />
                          </SplideSlide>
                        );
                      })
                  : ''}
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
              setVisibleA({ ...visibleA, colors: true });
            }}
            style={{
              display: visible.colors || visibleA.wheels ? 'none' : 'block',
            }}
          >
            {colorsState
              .filter((el) => el.name === `${selectedValues.accessories.color}`)
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
              setVisibleA({ ...visibleA, wheels: true });
            }}
            style={{
              display: visible.wheels || visibleA.colors ? 'none' : 'block',
            }}
          >
            {wheelsState
              .filter(
                (el) =>
                  el.name ===
                  `Car=${modelShort}, ${selectedValues.accessories.wheel}`
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
          {fetched ? (
            <div style={{ display: visible.colors ? 'block' : 'none' }}>
              <Colors />
            </div>
          ) : (
            ''
          )}
          {fetched ? (
            <div style={{ display: visible.wheels ? 'block' : 'none' }}>
              <Wheels />
            </div>
          ) : (
            ''
          )}
          <Link
            to={`/configure/interior/${year}/${model}`}
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
