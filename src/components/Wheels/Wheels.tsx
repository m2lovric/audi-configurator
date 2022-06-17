import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { storage } from '../../../modules/firebase';
import cancel from '../../assets/X.png';
import {
  configModelsAtom,
  wheelsAtom,
  visibleAtom,
  visibleAtomA,
  userConfiguration,
} from '../../../modules/state/atoms';

const Wheels = () => {
  const modelConfig = useRecoilValue(configModelsAtom);
  const [selectedValues, setSelectedValues] = useRecoilState(userConfiguration);
  const [wheels, setWheels] =
    useRecoilState<{ name: string; url: string; price: number }[]>(wheelsAtom);

  const [visible, setVisible] = useRecoilState(visibleAtom);
  const [visibleA, setVisibleA] = useRecoilState(visibleAtomA);

  const handleCancel = () => {
    setVisible({ ...visible, wheels: false });
    setVisibleA({ ...visibleA, wheels: false });
  };

  useEffect(() => {
    modelConfig.wheels.map((el) => {
      const starsRef = ref(storage, `wheels/${el}`);

      getDownloadURL(starsRef)
        .then((url) => {
          setWheels((oldArr) => [
            ...oldArr,
            {
              name: el.split('.')[0],
              url: url,
              price: 3000,
            },
          ]);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  return (
    <section className='colors'>
      <section className='colors__heading'>
        <h3>Wheels</h3>
        <button className='colors__btn' onClick={() => handleCancel()}>
          <img src={cancel} alt='cancel' />
        </button>
      </section>

      {wheels
        ? wheels.map((el) => {
            return (
              <article
                key={el.name}
                className='accessories'
                onClick={() =>
                  setSelectedValues({
                    ...selectedValues,
                    accessories: {
                      ...selectedValues.accessories,
                      wheel: el.name.split(' ')[1],
                    },
                  })
                }
              >
                <img src={el.url} alt='' />
                <section className='accessories__text'>
                  <p className='accessories__name'>{el.name}</p>
                  <p className='accessories__price'>{el.price}</p>
                </section>
              </article>
            );
          })
        : ''}

      <section className='colors__total'>
        <p>TOTAL</p>
        <p>1200000&euro;</p>
      </section>
      <button className='btn-primary-lg'>Done</button>
    </section>
  );
};

export default Wheels;
