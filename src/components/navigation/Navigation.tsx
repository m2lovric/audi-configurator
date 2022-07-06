import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg';
import hamburger from '@/assets/hamburger.svg';
import './style.scss';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from 'modules/firebase';
import { useRecoilState } from 'recoil';
import { userIdAtom, userStateAtom } from 'modules/state/atoms';

const Navigation = () => {
  const [user, setUser] = useState<User>();
  const [userState, setUserState] = useRecoilState(userStateAtom);
  const [userId, setUserId] = useRecoilState(userIdAtom);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUserState(false);
      navigate('/login');
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserId(user.uid);
        setUserState(true);
      } else {
        setUser(undefined);
        setUserState(false);
        navigate('/login');
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
