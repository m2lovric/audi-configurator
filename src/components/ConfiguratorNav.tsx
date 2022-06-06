import React from 'react';
import { Link } from 'react-router-dom';

interface ConfiguratorNavI {
  model: string;
  year: number;
}

const ConfiguratorNav = ({ model, year }: ConfiguratorNavI) => {
  return (
    <nav className='configuration-nav'>
      <Link to={'/'}>
        <p>{year}</p>
        <h3>{model}</h3>
      </Link>

      <section>
        <Link to={'/'}>01 Exterior</Link>
        <Link to={'/'}>02 Interior</Link>
        <Link to={'/'}>03 Summary</Link>
      </section>
    </nav>
  );
};

export default ConfiguratorNav;
