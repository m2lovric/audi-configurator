import hamburger from '@/assets/hamburger.svg';
import { auth } from '@/modules/firebase';
import { userIdAtom, userStateAtom } from '@/modules/state/index';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import logo from '../../assets/logo.svg';
import './style.scss';

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
        localStorage.setItem('user', `${user.uid}`);
      } else {
        setUser(undefined);
        setUserState(false);
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

        <nav className='nav__menu'>
          <img src={hamburger} alt='menu' onClick={() => setMenu(!menu)} />
          {user ? (
            <ul
              className='list'
              style={menu ? { display: 'block' } : { display: 'none' }}
            >
              <li className='list__section'>
                <Link to={'/'} className='text'>
                  My saved configurations
                </Link>
              </li>
              <li className='list__section'>
                <p className='text' onClick={() => handleLogout()}>
                  Logout
                </p>
              </li>
            </ul>
          ) : (
            <ul
              className='list'
              style={menu ? { display: 'block' } : { display: 'none' }}
            >
              <li className='list__section'>
                <Link to={'/login'} className='text'>
                  Login
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </section>
    </nav>
  );
};

export default Navigation;
