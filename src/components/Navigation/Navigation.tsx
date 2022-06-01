import React from 'react';
import logo from '../../assets/logo.svg';
import hamburger from '../../assets/hamburger.svg';
import './style.scss';

const Navigation = () => {
  return (
    <nav className='nav'>
      <section className='container'>
        <img src={logo} alt='logo' className='nav__logo' />
        <img src={hamburger} alt='menu' className='nav__menu' />
      </section>
    </nav>
  );
};

export default Navigation;
