import React from 'react';
import { Link } from 'react-router-dom';
import './car.scss';
import { CarInterface } from 'modules/interfaces/car';
import { Model } from 'modules/interfaces/model';
import { useRecoilState } from 'recoil';
import {
  colors,
  interior,
  selectModel,
  userConfiguration,
  wheels,
} from 'modules/state/index';

const Car = ({ data }: CarInterface) => {
  const [selectedValues, setSelectedValues] = useRecoilState(userConfiguration);
  const [colorsState, setColorState] = useRecoilState(colors);
  const [wheelsState, setWheelsState] = useRecoilState(wheels);
  const [interiorState, setInteriorState] = useRecoilState(interior);
  const [selectModels, setSelectModels] = useRecoilState<Model[]>(selectModel);

  const handleUpdate = () => {
    const car = selectModels.filter(
      (el) => el.model == data.model.split(' ')[1]
    )[0];

    console.log(car.default.color);

    setSelectedValues({
      ...selectedValues,
      model: car?.model?.split(' ')[1],
      accessories: {
        color: { ...car.default.color },
        interior: { ...car.default.interior },
        wheel: { ...car.default.wheels },
      },
      price: car.price,
    });

    console.log(car);

    setColorState([]);
    setWheelsState([]);
    setInteriorState([]);
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
