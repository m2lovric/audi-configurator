import React from 'react';
import { Link } from 'react-router-dom';
import './car.scss';
import { CarInterface } from 'modules/interfaces/car';
import useUpdate from './useUpdate';

const Car = ({ data }: CarInterface) => {
  const [handleUpdate] = useUpdate();

  return (
    <div>
      <article className='car'>
        <img src={data.image} alt='car' className='car__img' />
        <p className='car__year'>{data.production_year}</p>
        <h2 className='car__model'>{data.model}</h2>
        <Link
          to={`/configure/exterior/${data.production_year}/${data.model}`}
          className='btn-primary'
          onClick={() => handleUpdate(data)}
        >
          Configure Now
        </Link>
      </article>
    </div>
  );
};

export default Car;
