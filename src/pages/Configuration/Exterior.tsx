import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout, ConfiguratorNav, Colors, Wheels } from '../../components';
import { db, storage } from '../../../modules/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import './exterior.scss';
import { collection, getDocs } from 'firebase/firestore';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  colorsAtom,
  configModelsAtom,
  wheelsAtom,
} from '../../../modules/state/atoms';

export interface modelConfigI {
  colors: string[];
  wheels: string[];
}

const Exterior = () => {
  const { year, model } = useParams();
  const modelShort = model?.split(' ')[1];
  const sides = ['Front', 'Front Left', 'Side', 'Back', 'Back Left'];
  const colorsState = useRecoilValue(colorsAtom);
  const wheelsState = useRecoilValue(wheelsAtom);

  const [visibleA, setVisibleA] = useState({ colors: false, wheels: false });
  const [visible, setVisible] = useState({ colors: false, wheels: false });
  const [photos, setPhotos] = useState<string[]>([]);
  const [fetched, setFetched] = useState(false);
  const [modelConfig, setModelConfig] =
    useRecoilState<modelConfigI>(configModelsAtom);

  const [selectedValues, setSelectedValues] = useState({
    model: modelShort,
    color: 'Turbo Blue',
    wheels: 'Car=RS5, Style=One',
  });

  useEffect(() => {
    fetchData();

    console.log('exterior', modelConfig);

    sides.map((el) => {
      const starsRef = ref(
        storage,
        `${modelShort}/Car=${modelShort}, View=${el}, Color=Blue, Wheel Style=One-1.png`
      );

      getDownloadURL(starsRef)
        .then((url) => {
          setPhotos((oldArr) => [...oldArr, url]);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'config-models'));
    querySnapshot.forEach((doc: any) => {
      doc.data().model == modelShort
        ? setModelConfig({ ...doc.data().accessories })
        : '';
      setFetched(true);
    });
  };

  return (
    <Layout>
      <ConfiguratorNav model={model} year={year} />
      <section className='exterior'>
        <section className='exterior__slider'>
          <Splide hasTrack={false}>
            <section className='exterior__slider__container'>
              <SplideTrack>
                {photos
                  ? photos.map((el, i) => {
                      return (
                        <SplideSlide key={i}>
                          <img src={el} alt='car' />
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
              .filter((el) => el.name === selectedValues.color)
              .map((el) => {
                return (
                  <article key={el.name}>
                    <img src={el.url} alt='car' />
                    <p>{el.name}</p>
                    <p>PAINT COLOR</p>
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
              .filter((el) => el.name === selectedValues.wheels)
              .map((el) => {
                return (
                  <article key={el.name}>
                    <img src={el.url} alt='car' />
                    <p>{el.name}</p>
                    <p>WHEELS</p>
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
          <Link to={'/'}></Link>
        </aside>
      </section>
    </Layout>
  );
};

export default Exterior;
