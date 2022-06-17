import React, { useEffect } from 'react';
import { Layout, ConfiguratorNav } from '../../../components';
import { Link, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  colorsAtom,
  interiorAtom,
  wheelsAtom,
} from '../../../../modules/state/atoms';

const Summary = () => {
  const { year, model } = useParams();

  const [colorsState, setColorState] = useRecoilState(colorsAtom);
  const [wheelsState, setWheelsState] = useRecoilState(wheelsAtom);
  const [interiorState, setInteriorState] = useRecoilState(interiorAtom);

  useEffect(() => {
    setColorState([]);
    setWheelsState([]);
    setInteriorState([]);
  }, []);

  return (
    <Layout>
      <ConfiguratorNav model={model} year={year} active={'summary'} />
      <p>sdasd</p>
    </Layout>
  );
};

export default Summary;
