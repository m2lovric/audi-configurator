import React, { useEffect, useState } from 'react';
import { Layout } from '../../components';
import { collection, query, getDocs, DocumentData } from 'firebase/firestore';
import { db } from '../../../modules/firebase';

const Select = () => {
  const [models, setModels] = useState<DocumentData>([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'models'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setModels((oldArr) => [...oldArr, { ...doc.data(), id: doc.id }]);
      });
    };

    fetchData();
  }, []);

  return (
    <Layout>
      {models
        ? models.map((el: any) => <article key={el.id}>{el.model}</article>)
        : ''}
    </Layout>
  );
};

export default Select;
