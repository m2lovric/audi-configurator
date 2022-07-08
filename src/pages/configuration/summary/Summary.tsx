import React, { useEffect, useState } from 'react';
import {
  Layout,
  ConfiguratorNav,
  Wheels,
  Colors,
  InteriorColors,
} from '@/components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  colorsAtom,
  interiorAtom,
  totalPriceAtom,
  userConfigurationAtom,
  wheelsAtom,
} from 'modules/state/index';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage, db, auth } from 'modules/firebase';
import { sides } from '../exterior/Exterior';
import './summary.scss';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { onAuthStateChanged } from 'firebase/auth';

const Summary = () => {
  const { year, model, id } = useParams();
  const modelShort = model?.split(' ')[1];

  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceAtom);
  const [colorsState, setColorState] = useRecoilState(colorsAtom);
  const [wheelsState, setWheelsState] = useRecoilState(wheelsAtom);
  const [interiorState, setInteriorState] = useRecoilState(interiorAtom);
  const [selectedValues, setSelectedValues] = useRecoilState(
    userConfigurationAtom
  );
  const [photos, setPhotos] = useState<{ url: string; id: number }[]>([]);
  const [user, setUser] = useState<string>('');
  const navigate = useNavigate();
  const [sidePhoto, setSidePhoto] = useState('');

  useEffect(() => {
    setColorState([]);
    setWheelsState([]);
    setInteriorState([]);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
      } else {
        setUser('');
      }
    });

    sides.map((el) => {
      const starsRef = ref(
        storage,
        `${modelShort}/Car=${modelShort}, View=${el.view}, Color=${selectedValues.accessories.color.name}, Wheel ${selectedValues.accessories.wheel.name}.png`
      );

      getDownloadURL(starsRef)
        .then((url) => {
          setPhotos((oldArr) => [...oldArr, { url: url, id: el.id }]);
          el.id === 3 && setSidePhoto(url);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, [selectedValues.accessories]);

  const handleSaveConfig = async () => {
    const uid = uuidv4();
    const getId = id == undefined || id == 'undefined' ? uid : id;

    await setDoc(doc(db, user, getId), {
      ...selectedValues,
      sideUrl: sidePhoto,
      createdAt: new Date().toDateString(),
    });
    navigate('/');
  };

  return (
    <Layout>
      <ConfiguratorNav model={model} year={year} active={'summary'} />
      <section className='summary'>
        <h1 className='summary__title'>Almost done!</h1>
        <p className='summary__subtitle'>
          Review your configuration and save your car.
        </p>
        <section className='exterior__slider'>
          <Splide hasTrack={false}>
            <section className='exterior__slider__container'>
              <SplideTrack>
                {photos &&
                  photos
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

        <section className='summary__total'>
          <article className='summary__total__name'>
            <h3>{model}</h3>
            <p>{year}</p>
          </article>

          <article className='summary__total__price'>
            <p>TOTAL</p>
            <h3>{totalPrice}.00 &euro;</h3>
          </article>
        </section>

        <section className='summary__details'>
          <p className='summary__details__title'>Your configuration details</p>
          <section className='summary__details__right'>
            <article>
              <nav className='summary__details__nav'>
                <p>Exterior</p>
                <Link
                  to={`/configure/exterior/${year}/${model}/${id}`}
                  onClick={() => {
                    setColorState([]);
                    setWheelsState([]);
                  }}
                >
                  Edit
                </Link>
              </nav>
              <section>
                {colorsState
                  .filter(
                    (el) => el.name === selectedValues.accessories.color.name
                  )
                  .map((el) => {
                    return (
                      <article key={el.name} className='accessories'>
                        <img
                          src={el.url}
                          alt='car'
                          className='accessories__img'
                        />
                        <section className='accessories__summary__text'>
                          <p className='accessories__summary__name'>
                            {el.name}
                          </p>
                          <p className='accessories__summary__price'>
                            {el.price} &euro;
                          </p>
                        </section>
                      </article>
                    );
                  })}

                <div style={{ display: 'none' }}>
                  <Colors />
                </div>
              </section>
              <section>
                {wheelsState
                  .filter(
                    (el) =>
                      el.name ===
                      `Car=${modelShort}, ${selectedValues.accessories.wheel.name}`
                  )
                  .map((el) => {
                    return (
                      <article key={el.name} className='accessories'>
                        <img
                          src={el.url}
                          alt='car'
                          className='accessories__img'
                        />
                        <section className='accessories__summary__text'>
                          <p className='accessories__summary__name'>
                            {el.name}
                          </p>
                          <p className='accessories__summary__price'>
                            {el.price} &euro;
                          </p>
                        </section>
                      </article>
                    );
                  })}

                <div style={{ display: 'none' }}>
                  <Wheels />
                </div>
              </section>
            </article>

            <article>
              <nav className='summary__details__nav'>
                <p>Interior</p>
                <Link
                  to={`/configure/interior/${year}/${model}/${id}`}
                  onClick={() => setInteriorState([])}
                >
                  Edit
                </Link>
              </nav>

              <section>
                {interiorState
                  .filter(
                    (el) => el.name === selectedValues.accessories.interior.name
                  )
                  .map((el) => {
                    return (
                      <article key={el.name} className='accessories'>
                        <img
                          src={el.url}
                          alt='car'
                          className='accessories__img'
                        />
                        <section className='accessories__summary__text'>
                          <p className='accessories__summary__name'>
                            {el.name}
                          </p>
                          <p className='accessories__summary__price'>
                            {el.price} &euro;
                          </p>
                        </section>
                      </article>
                    );
                  })}

                <div style={{ display: 'none' }}>
                  <InteriorColors />
                </div>
              </section>
            </article>
          </section>
        </section>
      </section>

      <section className='summary__container'>
        <section className='summary__save'>
          <article className='summary__save__name'>
            <p>{year}</p>
            <h3>{model}</h3>
          </article>

          <article className='summary__save__price'>
            <p>TOTAL</p>
            <h3>{totalPrice}.00 &euro;</h3>
          </article>

          <button className='btn-primary' onClick={() => handleSaveConfig()}>
            Save your configuration
          </button>
        </section>
      </section>
    </Layout>
  );
};

export default Summary;
