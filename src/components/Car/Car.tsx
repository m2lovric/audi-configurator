import React from 'react';
import { Link } from 'react-router-dom';
import './car.scss';
import { motion } from 'framer-motion';
import { CarI } from '../../../modules/interfaces';
import { useRecoilState } from 'recoil';
import {
  colorsAtom,
  interiorAtom,
  userConfiguration,
  wheelsAtom,
} from '../../../modules/state/atoms';

const Car = ({ data }: CarI) => {
  const [selectedValues, setSelectedValues] = useRecoilState(userConfiguration);
  const [colorsState, setColorState] = useRecoilState(colorsAtom);
  const [wheelsState, setWheelsState] = useRecoilState(wheelsAtom);
  const [interiorState, setInteriorState] = useRecoilState(interiorAtom);

  const handleUpdate = () => {
    switch (data.model) {
      case 'Audi RS6':
        setSelectedValues({
          ...selectedValues,
          model: data.model.split(' ')[1],
          accessories: {
            ...selectedValues.accessories,
            color: 'Black',
            interior: 'Black&grey',
          },
          price: 90000,
        });
        setColorState([]);
        setWheelsState([]);
        setInteriorState([]);
        break;

      case 'Audi RS5':
        setSelectedValues({
          ...selectedValues,
          model: data.model.split(' ')[1],
          accessories: {
            ...selectedValues.accessories,
            color: 'Turbo Blue',
            interior: 'Black&grey',
          },
        });
        setColorState([]);
        setWheelsState([]);
        setInteriorState([]);
        break;

      case 'Audi e-tron GT':
        setSelectedValues({
          ...selectedValues,
          model: data.model.split(' ')[1],
          accessories: {
            ...selectedValues.accessories,
            color: 'Tactical Green',
            interior: 'Black',
          },
          price: 100000,
        });
        setColorState([]);
        setWheelsState([]);
        setInteriorState([]);
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <article className='car'>
        <img src={data.image} alt='car' className='car__img' />
        <p className='car__year'>{data.production_year}</p>
        <h2 className='car__model'>{data.model}</h2>
        <Link
          to={`/configure/exterior/${data.production_year}/${data.model}`}
          className='btn-primary'
          onClick={() => handleUpdate()}
        >
          Configure Now
        </Link>
      </article>
    </div>
  );
};

export default Car;
