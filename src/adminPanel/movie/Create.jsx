import Table from 'adminPanel/img/table.svg';
import Eye from 'adminPanel/img/eye.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'components/adminPanelComponents/Button';
import FlashMessage from 'components/adminPanelComponents/FlashMessage';

function Create() {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formState.isSubmitSuccessful) {
        setMessage('');
        reset({
          movieEn: '',
          movieKa: '',
        });
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [message, formState, reset]);

  const createMovie = async (data) => {
    try {
      await axios
        .post('movies/create', {
          'movie-en': data.movieEn,
          'movie-ka': data.movieKa,
        })
        .then((res) => {
          setMessage('successfully!');
        })
        .catch(() => setMessage('error'));
    } catch (err) {
      console.error(err);
    }
  };

  const emptyValue = `${t('Value is required')}`;
  return (
    <div>
      <div className='flex p-2 mb-10 -mt-12'>
        <p className='flex p-2'>
          <img className='flex-shrink-0 w-6 h-6 mr-3' src={Table} alt='table' />
          {t('Add Movie')}
        </p>
        <button className='flex p-2 text-white bg-gray-500 hover:bg-gray-600 rounded-xl'>
          <img className='w-6 h-6' src={Eye} alt='eye' />
          <Link to={'/adminpanel/movies'}>{t('All Movies')}</Link>
        </button>
      </div>
      <form onSubmit={handleSubmit(createMovie)} className='mt-10'>
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
            {...register('movieEn', { required: emptyValue })}
          />
          {errors.movieEn && (
            <p className='mt-2 text-xs text-red-500'>
              {errors.movieEn.message}
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
            {...register('movieKa', { required: emptyValue })}
          />
          {errors.movieKa && (
            <p className='mt-2 text-xs text-red-500'>
              {errors.movieKa.message}
            </p>
          )}
        </div>
        <div className='flex mb-6 w-min'>
          <Button flash={message} title='Create' />
          <FlashMessage flash={message} />
        </div>
      </form>
    </div>
  );
}

export default Create;
