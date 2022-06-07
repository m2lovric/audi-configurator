import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './configuratorNav.scss';

interface ConfiguratorNavI {
  model?: string;
  year?: string;
}

const ConfiguratorNav = ({ model, year }: ConfiguratorNavI) => {
  const activeStyle = {
    color: '#2E2E38',
    fontWeight: 700,
  };

  const disabledStyle = {
    color: '#2E2E38',
    fontWeight: 400,
  };

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
            style={({ isActive }) => (isActive ? activeStyle : disabledStyle)}
            className='configurator-nav__links'
          >
            01 Exterior
          </NavLink>
          <NavLink
            to={`/configure/interior/${year}/${model}`}
            style={({ isActive }) => (isActive ? activeStyle : disabledStyle)}
            className='configurator-nav__links'
          >
            02 Interior
          </NavLink>
          <NavLink
            to={`/configure/summary/${year}/${model}`}
            style={({ isActive }) => (isActive ? activeStyle : disabledStyle)}
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
