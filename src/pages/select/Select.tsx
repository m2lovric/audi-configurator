import React from 'react';
import { Layout, Car } from '@/components';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import './select.scss';
import useFetchData from './useFetchData';

const Select = () => {
  const [models, selectModels] = useFetchData();

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
