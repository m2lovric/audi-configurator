import { Layout } from './components';
import './app.scss';
import car from './assets/front-left-2.png';
import { useRecoilValue } from 'recoil';
import { userIdAtom, userStateAtom } from '../modules/state/atoms';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDocs, collection, DocumentData } from 'firebase/firestore';
import { auth, db } from '../modules/firebase/index';
import { onAuthStateChanged } from 'firebase/auth';
import { modelI, modelIdI } from '../modules/interfaces';

function App() {
  const user = useRecoilValue(userStateAtom);
  const userId = useRecoilValue(userIdAtom);
  const [savedConfigs, setSavedConfigs] = useState<modelIdI[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    user ? '' : navigate('/login');
    getData();
  }, [user]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, userId));
    querySnapshot.docs.map((el: DocumentData) => {
      setSavedConfigs((oldArr) => [...oldArr, { id: el.id, ...el.data() }]);
    });
  };

  return (
    <Layout>
      <section className='home'>
        <header className='home__header'>
          <h2 className='home__heading'>View saved configurations</h2>
          <Link to={'/select'} className='btn-primary'>
            Configure a car
          </Link>
        </header>
        {savedConfigs ? (
          savedConfigs.map((el) => {
            return (
              <section className='savedModel' key={el.id}>
                <img src={el.sideUrl} alt='car side photo' />
                <article className='savedModel__right'>
                  <p className='savedModel__right__year'>{el.year}</p>
                  <h1 className='savedModel__right__name'>{el.fullName}</h1>
                  <p className='savedModel__right__color'>
                    {el.accessories.color.toUpperCase()}
                  </p>
                  <p className='savedModel__right__date'>{el.createdAt}</p>
                </article>
              </section>
            );
          })
        ) : (
          <>
            <img src={car} alt='car' className='home__img' />
            <p className='home__text'>
              You haven't configured any cars yet. You may choose to
              <span> configure some now.</span>
            </p>
          </>
        )}
      </section>
    </Layout>
  );
}

export default App;
