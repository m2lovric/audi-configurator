import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg';
import hamburger from '../../assets/hamburger.svg';
import './style.scss';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '../../../modules/firebase';
import { useRecoilState } from 'recoil';
import { userAtom, userStateAtom } from '../../../modules/state/atoms';

const Navigation = () => {
  const [user, setUser] = useState<User>();
  const [userState, setUserState] = useRecoilState(userStateAtom);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUserState(false);
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserState(true);
      } else {
        setUser(undefined);
        setUserState(false);
      }
    });
  }, []);

  return (
    <nav className='nav'>
      <section className='container'>
        <Link to={'/'} className='nav__logo'>
          <img src={logo} alt='logo' />
        </Link>

        <section className='nav__menu'>
          <img src={hamburger} alt='menu' />
          {user ? (
            <section className='list'>
              <article className='list__section'>
                <Link to={'/'} className='text'>
                  My saved configurations
                </Link>
              </article>
              <article className='list__section'>
                <p className='text' onClick={() => handleLogout()}>
                  Logout
                </p>
              </article>
            </section>
          ) : (
            <section className='list'>
              <article className='list__section'>
                <Link to={'/login'} className='text'>
                  Login
                </Link>
              </article>
            </section>
          )}
        </section>
      </section>
    </nav>
  );
};

export default Navigation;
