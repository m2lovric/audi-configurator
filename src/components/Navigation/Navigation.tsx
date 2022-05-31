import React from 'react';
import logo from '../../assets/logo.svg';
import hamburger from '../../assets/hamburger.svg';
import './style.scss';

const Navigation = () => {
  return (
    <nav className='nav'>
      <img src={logo} alt='logo' className='nav__logo' />
      <img src={hamburger} alt='menu' />
    </nav>
  );
};

export default Navigation;
