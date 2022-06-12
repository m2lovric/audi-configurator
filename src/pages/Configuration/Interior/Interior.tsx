import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout, ConfiguratorNav, InteriorColors } from '../../../components';
import { db, storage } from '../../../../modules/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '../exterior.scss';
import { collection, getDocs } from 'firebase/firestore';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  interiorAtom,
  configModelsAtom,
} from '../../../../modules/state/atoms';

const Interior = () => {
  const { year, model } = useParams();
  const modelShort = model?.split(' ')[1];
  const sides = ['Dash', 'Seats'];
  const interiorState = useRecoilValue(interiorAtom);

  const [photos, setPhotos] = useState<string[]>([]);
  const [fetched, setFetched] = useState(false);

  const [selectedValues, setSelectedValues] = useState({
    model: modelShort,
    color: 'Black&grey',
  });

  useEffect(() => {
    sides.map((el) => {
      const starsRef = ref(
        storage,
        `${modelShort}/Car=${modelShort}, Color=Black&grey, View=${el}.png`
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
          <section onClick={() => {}} style={{}}>
            {interiorState
              .filter((el) => el.name === selectedValues.color)
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

          {fetched ? (
            <div>
              <InteriorColors />
            </div>
          ) : (
            ''
          )}

          <Link to={'/'} className='btn-primary-lg'>
            Summary
          </Link>
        </aside>
      </section>
    </Layout>
  );
};

export default Interior;
