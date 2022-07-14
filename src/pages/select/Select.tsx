import { Car, Layout } from '@/components';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useParams } from 'react-router-dom';
import './select.scss';
import useFetchData from './useFetchData';

const Select = () => {
  const [models, selectModels] = useFetchData();
  const { year, model, id } = useParams();

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
                      <Car data={el} id={id} />
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
