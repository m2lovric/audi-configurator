import { CarInterface } from '@/modules/interfaces/car';
import { Link, useParams } from 'react-router-dom';
import './car.scss';
import useUpdate from './useUpdate';

interface carProps {
  data: {
    id: string;
    image: string;
    model: string;
    production_year: number;
  };
  id: string | undefined;
}

const Car = ({ data }: carProps) => {
  const [handleUpdate] = useUpdate();
  const { year, model, id } = useParams();

  return (
    <div>
      <article className='car'>
        <img src={data.image} alt='car' className='car__img' />
        <p className='car__year'>{data.production_year}</p>
        <h2 className='car__model'>{data.model}</h2>
        <Link
          to={`/configure/exterior/${data.production_year}/${data.model}/${id}`}
          className='btn-primary'
          onClick={() => handleUpdate(data)}
        >
          Configure Now
        </Link>
      </article>
    </div>
  );
};

export default Car;
