import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, ConfiguratorNav, Colors } from '../../components';
import { db, storage } from '../../../modules/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import './exterior.scss';
import { collection, getDocs } from 'firebase/firestore';
import { useRecoilState } from 'recoil';
import { configModelsAtom } from '../../../modules/state/atoms';

export interface modelConfigI {
  colors: string[];
  wheels: string[];
}

const Exterior = () => {
  const { year, model } = useParams();
  const modelShort = model?.split(' ')[1];
  const sides = ['Front', 'Front Left', 'Side', 'Back', 'Back Left'];

  const [photos, setPhotos] = useState<string[]>([]);
  const [wheels, setWheels] = useState<Object[]>([]);
  const [fetched, setFetched] = useState(false);
  const [modelConfig, setModelConfig] =
    useRecoilState<modelConfigI>(configModelsAtom);

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
        <aside className='exterior__aside'>{fetched ? <Colors /> : ''}</aside>
      </section>
    </Layout>
  );
};

export default Exterior;
