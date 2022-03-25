import Table from '../../img/table.svg';
import Eye from '../../img/eye.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('movie-en', data.movieEn);
    formData.append('movie-ka', data.movieKa);

    axios
      .post('movies/create', formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className='flex p-2 mb-10 -mt-12'>
        <p className='flex p-2'>
          <img className='flex-shrink-0 w-6 h-6 mr-3' src={Table} alt='table' />
          Add Movie
        </p>
        <button className='flex p-2 text-white bg-gray-500 hover:bg-gray-600 rounded-xl'>
          <img className='w-6 h-6' src={Eye} alt='eye' />
          <Link to={'/adminpanel/movies'}>All Data</Link>
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-10'>
        <div className='mb-6'>
          <label
            className='block mb-2 text-xs font-bold text-gray-700 uppercase'
            htmlFor='movie_{{ $locale }}'
          >
            Movie_EN
          </label>
          <input
            className={`w-full p-2 border border-gray-400 rounded outline-none ${
              errors.movieEn && 'w-full p-2 border-2 border-red-700 rounded'
            }`}
            type='text'
            name='movie-en'
            id='movie-en'
            {...register('movieEn', { required: 'Value is required' })}
          />
          {errors.movieEn && (
            <p className='mt-2 text-xs text-red-500'>
              {errors.quoteEn.message}
            </p>
          )}
        </div>

        <div className='mb-6'>
          <label
            className='block mb-2 text-xs font-bold text-gray-700 uppercase'
            htmlFor='movie_ka'
          >
            Movie_KA
          </label>
          <input
            className={`w-full p-2 border border-gray-400 rounded outline-none ${
              errors.movieKa && 'w-full p-2 border-2 border-red-700 rounded'
            }`}
            type='text'
            name='movie-ka'
            id='movie-ka'
            {...register('movieKa', { required: 'Value is required' })}
          />
          {errors.movieKa && (
            <p className='mt-2 text-xs text-red-500'>
              {errors.quoteKa.message}
            </p>
          )}
        </div>

        <div className='flex mb-6 w-min'>
          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-green-600 rounded-lg rounderd hover:bg-green-700'
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
