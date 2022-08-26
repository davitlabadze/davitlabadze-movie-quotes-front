import { TableIcon, EyeIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'components/adminPanelComponents/Button';
import Title from 'components/Title';
import Nameless from 'components/adminPanelComponents/Nameless';
import toast, { Toaster } from 'react-hot-toast';

function Create() {
  Title('Movie | Create');
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        movieEn: '',
        movieKa: '',
      });
    }
  }, [formState, reset]);

  const errorMessage = `${t('failed_to_create')}`;
  const successfullyMessage = `${t('successfully_created!')}`;
  const networkErrorMessage = `${t('network_error')}`;
  const methodNotAllowedMessage = `${t('method_not_allowed')}`;
  const emptyValueMessage = `${t('Value is required')}`;

  const createMovie = async (data) => {
    try {
      const formData = new FormData();
      formData.append('movie_en', data.movieEn);
      formData.append('movie_ka', data.movieKa);
      await axios
        .post('movies/create', formData)
        .then(() => {
          toast.success(successfullyMessage, {
            className:
              'bg-gray-50 shadow-lg dark:bg-slate-900 dark:text-slate-500',
          });
        })
        .catch((error) => {
          if (error.response.status === 405) {
            toast.error(methodNotAllowedMessage, {
              className:
                'bg-gray-50 shadow-lg dark:bg-slate-900 dark:text-slate-500',
            });
          } else {
            toast.error(errorMessage, {
              className:
                'bg-gray-50 shadow-lg dark:bg-slate-900 dark:text-slate-500',
            });
          }
        });
    } catch (err) {
      toast.error(networkErrorMessage, {
        className: 'bg-gray-50 shadow-lg dark:bg-slate-900 dark:text-slate-500',
      });
    }
  };

  return (
    <div>
      <Toaster />
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
            // eslint-disable-next-line prettier/prettier
            className={`w-full p-2 border dark:border-slate-700 border-gray-400 dark:bg-slate-800 dark:text-slate-600 rounded outline-none ${errors.movieEn && 'w-full p-2 border-2 border-red-700 rounded'}`}
            type='text'
            name='movie-en'
            id='movie-en'
            {...register('movieEn', { required: emptyValueMessage })}
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
            // eslint-disable-next-line prettier/prettier
            className={`w-full dark:bg-slate-800 dark:text-slate-600 dark:border-slate-700 p-2 border border-gray-400 rounded outline-none ${errors.movieKa && 'w-full p-2 border-2 border-red-700 rounded'}`}
            type='text'
            name='movie-ka'
            id='movie-ka'
            {...register('movieKa', { required: emptyValueMessage })}
          />
          {errors.movieKa && (
            <p className='mt-2 text-xs text-red-500'>
              {errors.movieKa.message}
            </p>
          )}
        </div>
        <div className='flex mb-6 w-min'>
          <Button title='Create' />
        </div>
      </form>
    </div>
  );
}

export default Create;
