import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './configuratorNav.scss';

interface ConfiguratorNavI {
  model?: string;
  year?: string;
  active?: string;
}

const ConfiguratorNav = ({ model, year, active }: ConfiguratorNavI) => {
  return (
    <nav className='configurator-nav'>
      <section className='configurator-nav__container'>
        <Link to={'/select'} className='configurator-nav__model'>
          <p>{year}</p>
          <h3>{model}</h3>
        </Link>

        <section>
          <NavLink
            to={`/configure/exterior/${year}/${model}`}
            style={
              active == 'exterior'
                ? { color: '#2E2E38', fontWeight: 700 }
                : { color: '#2E2E38', fontWeight: 400 }
            }
            className='configurator-nav__links'
          >
            01 Exterior
          </NavLink>
          <NavLink
            to={`/configure/interior/${year}/${model}`}
            style={
              active == 'interior'
                ? { color: '#2E2E38', fontWeight: 700 }
                : { color: '#2E2E38', fontWeight: 400 }
            }
            className='configurator-nav__links'
          >
            02 Interior
          </NavLink>
          <NavLink
            to={`/configure/summary/${year}/${model}`}
            style={
              active == 'summary'
                ? { color: '#2E2E38', fontWeight: 700 }
                : { color: '#2E2E38', fontWeight: 400 }
            }
            className='configurator-nav__links'
          >
            03 Summary
          </NavLink>
        </section>
      </section>
    </nav>
  );
};

export default ConfiguratorNav;
