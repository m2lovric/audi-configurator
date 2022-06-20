import { Layout } from './components';
import './app.scss';
import car from './assets/front-left-2.png';
import { useRecoilValue } from 'recoil';
import { userStateAtom } from '../modules/state/atoms';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const user = useRecoilValue(userStateAtom);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    user ? '' : navigate('/login');
  }, []);

  return (
    <Layout>
      <section className='home'>
        <header className='home__header'>
          <h2 className='home__heading'>View saved configurations</h2>
          <Link to={'/select'} className='btn-primary'>
            Configure a car
          </Link>
        </header>
        <img src={car} alt='car' className='home__img' />
        <p className='home__text'>
          You haven't configured any cars yet. You may choose to
          <span> configure some now.</span>
        </p>
      </section>
    </Layout>
  );
}

export default App;
