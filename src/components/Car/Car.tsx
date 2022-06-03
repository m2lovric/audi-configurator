import React from 'react';
import { Link } from 'react-router-dom';
import './car.scss';
import { motion } from 'framer-motion';

export interface CarI {
  data: {
    id: string;
    image: string;
    model: string;
    production_year: number;
  };
}

const Car = ({ data }: CarI) => {
  return (
    <motion.div className='item' key={data.id}>
      <article className='car'>
        <img src={data.image} alt='car' className='car__img' />
        <p className='car__year'>{data.production_year}</p>
        <h2 className='car__model'>{data.model}</h2>
        <Link to={'/configure'} className='btn-primary'>
          Configure Now
        </Link>
      </article>
    </motion.div>
  );
};

export default Car;
