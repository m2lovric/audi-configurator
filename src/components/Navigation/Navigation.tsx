import React from 'react';
import logo from '../../assets/logo.svg';
import hamburger from '../../assets/hamburger.svg';
import './style.scss';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className='nav'>
      <section className='container'>
        <Link to={'/'} className='nav__logo'>
          <img src={logo} alt='logo' />
        </Link>

        <img src={hamburger} alt='menu' className='nav__menu' />
      </section>
    </nav>
  );
};

export default Navigation;
