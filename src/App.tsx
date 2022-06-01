import { Layout } from './components';
import './app.scss';
import car from './assets/front-left-2.png';

function App() {
  return (
    <Layout>
      <section className='home'>
        <header className='home__header'>
          <h2 className='home__heading'>View saved configurations</h2>
          <button className='btn-primary'>Configure a car</button>
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
