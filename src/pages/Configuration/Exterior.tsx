import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, ConfiguratorNav } from '../../components';
import { db, storage } from '../../../modules/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import './exterior.scss';

const Exterior = () => {
  const { year, model } = useParams();
  const modelShort = model?.split(' ')[1];
  const sides = ['Front', 'Front Left', 'Side', 'Back', 'Back Left'];
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    sides.map((el) => {
      const starsRef = ref(
        storage,
        `${modelShort}/Car=${modelShort}, View=${el}, Color=Blue, Wheel Style=One.png`
      );

      getDownloadURL(starsRef)
        .then((url) => {
          setPhotos((oldArr) => [...oldArr, url]);
          console.log(photos);
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
          <h2>side</h2>
        </aside>
      </section>
    </Layout>
  );
};

export default Exterior;
