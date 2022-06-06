import React, { useEffect, useState } from 'react';
import { Layout, Car } from '../../components';
import { collection, query, getDocs, DocumentData } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../modules/firebase';
import { CarI } from '../../components/Car/Car';
import './select.scss';
import { motion } from 'framer-motion';

const Select = () => {
  const [models, setModels] = useState<CarI[]>([]);

  const starsRef = ref(
    storage,
    `RS5/Car=RS5, View=Side, Color=Red, Wheel Style=One.png`
  );

  getDownloadURL(starsRef)
    .then((url) => {
      console.log(url);
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          break;
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break;
      }
    });

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
