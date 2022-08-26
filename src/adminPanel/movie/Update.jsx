import React, { useEffect, useState, Fragment, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TableIcon, EyeIcon } from '@heroicons/react/outline';
import { useTranslation } from 'react-i18next';
import Button from 'components/adminPanelComponents/Button';
import Title from 'components/Title';
import Nameless from 'components/adminPanelComponents/Nameless';
import toast, { Toaster } from 'react-hot-toast';
function Update() {
  Title('Movie | Update');
  const { t } = useTranslation();
  const [id, setID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const params = useParams();
  const errorMessage = `${t('failed_to_update')}`;
  const successfullyMessage = `${t('successfully_updated!')}`;
  const networkErrorMessage = `${t('network_error')}`;
  const methodNotAllowedMessage = `${t('method_not_allowed')}`;
  const emptyValueMessage = `${t('Value is required')}`;

  const getMovie = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios.get(`movies/${params.movieId}/edit`).then((res) => {
        setMovie(res.data);
        setID(res.data.id);
        setValue('movieEn', res.data.movie.en);
        setValue('movieKa', res.data.movie.ka);
      });
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }, [params.movieId, setValue]);

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  const updateMovie = async (data) => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('movie_en', data.movieEn);
    formData.append('movie_ka', data.movieKa);
    try {
      await axios(`movies/${id}/update`, {
        data: formData,
        method: 'POST',
      })
        .then(() => {
          toast.success(successfullyMessage, {
            className:
              'bg-gray-50 shadow-lg dark:bg-slate-900 dark:text-slate-500',
          });
        })
        .catch((error) => {
          console.log(error.response);
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
      console.error(err);
    }
  };

  return (
    <Fragment>
      <Toaster />
      {!isLoading && movie && (
        <div>
          <Nameless
            icon={<TableIcon />}
            btnIcon={<EyeIcon />}
            title='Edit Movie'
            path='/adminpanel/movies'
            action='All Movies'
          />
          <form onSubmit={handleSubmit(updateMovie)} className='mt-10'>
            <div className='mb-6'>
              <label
                className='block mb-2 text-xs font-bold text-gray-700 uppercase'
                htmlFor='movie-en'
              >
                {t('Movie_en')}
              </label>
              <input
                // eslint-disable-next-line prettier/prettier
                className={`w-full dark:bg-slate-800 dark:text-slate-600 dark:border-slate-700 p-2 border border-gray-400 rounded outline-none ${errors.movieEn && 'w-full p-2 border-2 border-red-700 rounded'}`}
                type='text'
                name='movie-en'
                id='movie-en'
                {...register('movieEn', {
                  required: emptyValueMessage,
                })}
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
                htmlFor='movie-ka'
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
              <Button title='Update' />
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
}

export default Update;
