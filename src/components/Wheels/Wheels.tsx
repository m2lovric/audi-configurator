import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { storage } from '../../../modules/firebase';
import { configModelsAtom } from '../../../modules/state/atoms';

const Wheels = () => {
  const modelConfig = useRecoilValue(configModelsAtom);
  const [wheels, setWheels] = useState<
    { name: string; url: string; price: number }[]
  >([]);

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
    <section>
      {wheels
        ? wheels.map((el) => {
            return (
              <article key={el.name} className='accessories'>
                <img src={el.url} alt='' />
                <section className='accessories__text'>
                  <p className='accessories__name'>{el.name}</p>
                  <p className='accessories__price'>{el.price}</p>
                </section>
              </article>
            );
          })
        : ''}
    </section>
  );
};

export default Wheels;
