import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg';
import hamburger from '@/assets/hamburger.svg';
import './style.scss';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from 'modules/firebase';
import { useRecoilState } from 'recoil';
import { userId, userState } from 'modules/state/index';

const Navigation = () => {
  const [user, setUser] = useState<User>();
  const [userData, setUserData] = useRecoilState(userState);
  const [id, setId] = useRecoilState(userId);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUserData(false);
      navigate('/login');
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setId(user.uid);
        setUserData(true);
        localStorage.setItem('user', `${user.uid}`);
      } else {
        setUser(undefined);
        setUserData(false);
        localStorage.setItem('user', '');
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
          <img src={hamburger} alt='menu' onClick={() => setMenu(!menu)} />
          {user ? (
            <section
              className='list'
              style={menu ? { display: 'block' } : { display: 'none' }}
            >
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
            <section
              className='list'
              style={menu ? { display: 'block' } : { display: 'none' }}
            >
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
