import { TableIcon, EyeIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'components/adminPanelComponents/Button';
import FlashMessage from 'components/adminPanelComponents/FlashMessage';
import Title from 'components/Title';
import Nameless from 'components/adminPanelComponents/Nameless';
function Create() {
  Title('Movie | Create');
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
      const formData = new FormData();
      formData.append('movie[en]', data.movieEn);
      formData.append('movie[ka]', data.movieKa);
      await axios
        .post('movies/create', formData)
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
      <Nameless
        icon={<TableIcon />}
        btnIcon={<EyeIcon />}
        title='Add Movie'
        path='/adminpanel/movies'
        action='All Movies'
      />
      <form onSubmit={handleSubmit(createMovie)} className='mt-10'>
        <div className='mb-6'>
          <label
            className='block mb-2 text-xs font-bold text-gray-700 uppercase'
            htmlFor='movie_en'
          >
            {t('Movie_en')}
          </label>
          <input
            className={`w-full p-2 border dark:border-slate-700 border-gray-400 dark:bg-slate-800 dark:text-slate-600 rounded outline-none ${
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
            {t('Movie_ka')}
          </label>
          <input
            className={`w-full dark:bg-slate-800 dark:text-slate-600 dark:border-slate-700 p-2 border border-gray-400 rounded outline-none ${
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
