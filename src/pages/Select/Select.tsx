import React, { useEffect, useState } from 'react';
import { Layout, Car } from '../../components';
import { collection, query, getDocs, DocumentData } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { db } from '../../../modules/firebase';
import { CarI } from '../../components/Car/Car';
import './select.scss';
import { motion } from 'framer-motion';

const Select = () => {
  const [models, setModels] = useState<CarI[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log('fetched');
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
