import { Layout } from './components';
import './app.scss';
import car from './assets/front-left-2.png';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { configModelsAtom, userConfiguration } from 'modules/state/atoms';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getDocs,
  collection,
  DocumentData,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from 'modules/firebase/index';
import { Model } from 'modules/interfaces/model';
import { userStateAtom, userIdAtom } from 'modules/state/atoms';
import dots from './assets/Union.svg';

function App() {
  const user = useRecoilValue(userStateAtom);
  const userId = useRecoilValue(userIdAtom);
  const [savedConfigs, setSavedConfigs] = useState<Model[]>([]);
  const [menu, setMenu] = useState(false);
  const [selectedValues, setSelectedValues] = useRecoilState(userConfiguration);
  const [modelConfig, setModelConfig] = useRecoilState(configModelsAtom);
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate('/');
    getData();
  }, [user]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, userId));
    querySnapshot.docs.map((el: DocumentData) => {
      setSavedConfigs((oldArr) => [...oldArr, { id: el.id, ...el.data() }]);
    });
  };

  const handleEdit = async (
    data: Model,
    year: number,
    fullName?: string,
    id?: string
  ) => {
    const querySnapshot = await getDocs(collection(db, 'config-models'));
    querySnapshot.forEach((doc: any) => {
      doc.data().model == data.model
        ? setModelConfig({
            ...doc.data().accessories,
            default: {
              color: data.accessories.color.name,
              interior: data.accessories.interior.name,
              wheels: data.accessories.wheel.name,
            },
          })
        : '';
    });
    setSelectedValues({ ...data });
    navigate(`/configure/summary/${year}/${fullName}/${id}`);
  };

  const handleDelete = async (id: string) => {
    setSavedConfigs((oldArr) => oldArr.filter((el) => el.id !== id));
    await deleteDoc(doc(db, userId, id));
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
        {savedConfigs.length > 0 ? (
          savedConfigs.map((el) => {
            return (
              <section className='savedModel' key={el.id}>
                <img
                  src={el.sideUrl}
                  alt='car side photo'
                  className='savedModel__car'
                />
                <article className='savedModel__right'>
                  <p className='savedModel__right__year'>{el.year}</p>
                  <h1 className='savedModel__right__name'>{el.fullName}</h1>
                  <p className='savedModel__right__color'>
                    {el.accessories.color.name.toUpperCase()}
                  </p>
                  <p className='savedModel__right__date'>{el.createdAt}</p>
                </article>
                <article
                  className='savedModel__menu'
                  onClick={() => setMenu(!menu)}
                >
                  <img src={dots} alt='menu' />
                  <section
                    className='list'
                    style={menu ? { display: 'block' } : { display: 'none' }}
                  >
                    <article className='list__section'>
                      <p
                        onClick={() =>
                          handleEdit(el, el.year!, el.fullName, el.id)
                        }
                        className='text'
                      >
                        Edit configuration
                      </p>
                    </article>
                    <article
                      className='list__section'
                      onClick={() => handleDelete(el.id!)}
                    >
                      <p className='delete'>Delete</p>
                    </article>
                  </section>
                </article>
              </section>
            );
          })
        ) : (
          <>
            <img src={car} alt='car' className='home__img' />
            <p className='home__text'>
              You haven't configured any cars yet. You may choose to
              <Link to={'/select'} className='link'>
                {' '}
                configure some now.
              </Link>
            </p>
          </>
        )}
      </section>
    </Layout>
  );
}

export default App;
