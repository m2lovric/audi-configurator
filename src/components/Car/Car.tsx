import React from 'react';
import { Link } from 'react-router-dom';
import './car.scss';
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
            color: { name: 'Black', price: 2500 },
            interior: { name: 'Black&grey', price: 3500 },
          },
          price:
            90000 +
            selectedValues.accessories.color.price +
            selectedValues.accessories.interior.price +
            selectedValues.accessories.wheel.price,
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
            color: { name: 'Turbo Blue', price: 2000 },
            interior: { name: 'Black&grey', price: 3000 },
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
            color: { name: 'Tactical Green', price: 2000 },
            interior: { name: 'Black', price: 3000 },
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
