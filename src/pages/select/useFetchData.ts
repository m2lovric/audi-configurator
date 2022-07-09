import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { modelsAtom } from './models';
import { Model } from 'modules/interfaces/model';
import { selectModelAtom } from 'modules/state';
import { getDocs, collection, DocumentData } from 'firebase/firestore';
import { db } from 'modules/firebase';

const useFetchData = () => {
  const [models, setModels] = useRecoilState(modelsAtom);
  const [selectModels, setSelectModels] =
    useRecoilState<Model[]>(selectModelAtom);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'models'));
    querySnapshot.forEach((doc) => {
      setModels((oldArr: any) => [...oldArr, { ...doc.data(), id: doc.id }]);
    });

    const querySnapshotConfigModels = await getDocs(
      collection(db, 'config-models')
    );
    querySnapshotConfigModels.forEach((doc: any) => {
      setSelectModels((oldArr: any) => [
        ...oldArr,
        { ...doc.data(), id: doc.id },
      ]);
    });
  };

  return [models, selectModels];
};

export default useFetchData;
