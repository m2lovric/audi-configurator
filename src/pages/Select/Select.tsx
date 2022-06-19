import React, { useEffect, useState } from 'react';
import { Layout, Car } from '../../components';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../modules/firebase';
import { CarI } from '../../../modules/interfaces/index';
import './select.scss';
import { motion } from 'framer-motion';

const Select = () => {
  const [models, setModels] = useState<CarI[]>([]);

  useEffect(() => {
    fetchData();
    console.log(models);
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'models'));
    querySnapshot.forEach((doc: any) => {
      setModels((oldArr) => [...oldArr, { ...doc.data(), id: doc.id }]);
    });
  };

  return (
    <Layout>
      <section className='select'>
        <h2 className='select__title'>Configure a car</h2>
        <p className='select__sub'>
          Pick you favorite model and start configuring.
        </p>
        <motion.div className='carousel select__carousel'>
          <motion.div
            drag='x'
            dragConstraints={{ right: 0, left: -500 }}
            className='inner-carousel select__cars '
          >
            {models
              ? models.map((el: any) => {
                  console.log(el);
                  return (
                    <motion.div key={el.id}>
                      <Car data={el} />
                    </motion.div>
                  );
                })
              : ''}
          </motion.div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Select;
