import React, { useEffect, useState } from 'react';
import { Layout, Car } from '@/components';
import {
  collection,
  DocumentData,
  getDocs,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from 'modules/firebase';
import { CarI, modelI } from 'modules/interfaces/index';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import './select.scss';
import { useRecoilState } from 'recoil';
import { selectModelAtom } from 'modules/state/atoms';

const Select = () => {
  const [models, setModels] = useState<CarI[]>([]);
  const [selectModels, setSelectModels] =
    useRecoilState<modelI[]>(selectModelAtom);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'models'));
    querySnapshot.forEach((doc: any) => {
      setModels((oldArr) => [...oldArr, { ...doc.data(), id: doc.id }]);
    });

    const querySnapshotConfigModels = await getDocs(
      collection(db, 'config-models')
    );
    querySnapshotConfigModels.forEach((doc: any) => {
      setSelectModels((oldArr: any) => [
        ...oldArr,
        { ...doc.data(), id: doc.id },
      ]);
      console.log(selectModels);
    });
  };

  return (
    <Layout>
      <section className='select'>
        <h2 className='select__title'>Configure a car</h2>
        <p className='select__sub'>
          Pick you favorite model and start configuring.
        </p>
        <Splide
          className='carousel select__carousel'
          hasTrack={false}
          tag='section'
          options={{
            type: 'slider',
            perPage: 2,
            gap: -80,
            breakpoints: {
              480: { perPage: 1, gap: 0 },
            },
          }}
        >
          <SplideTrack>
            {models
              ? models.map((el: any) => {
                  return (
                    <SplideSlide key={el.id}>
                      <Car data={el} />
                    </SplideSlide>
                  );
                })
              : ''}
            <div className='splide__arrows'></div>
            <div className='splide__pagination'></div>
          </SplideTrack>
        </Splide>
      </section>
    </Layout>
  );
};

export default Select;
