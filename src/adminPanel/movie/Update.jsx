import React, { useEffect, useState, Fragment, useCallback } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FlashMessage from 'components/adminPanelComponents/FlashMessage';
import Table from 'adminPanel/img/table.svg';
import Eye from 'adminPanel/img/eye.svg';
import { useTranslation } from 'react-i18next';
import Button from 'components/adminPanelComponents/Button';
import Title from 'components/Title';
function Update() {
  Title('Movie | Update');
  const { t } = useTranslation();
  const [id, setID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState();
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const params = useParams();

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
    const timer = setTimeout(() => {
      setMessage('');
    }, 2000);
    return () => clearTimeout(timer);
  }, [message, getMovie]);

  const updateMovie = async (data) => {
    try {
      await axios
        .put(`movies/${id}/update`, {
          'movie-en': data.movieEn,
          'movie-ka': data.movieKa,
        })
        .then((res) => {
          setMessage('successfully!');
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
  };

  const emptyValueMessage = `${t('Value is required')}`;
  return (
    <Fragment>
      {!isLoading && movie && (
        <div>
          <div className='flex p-2 mb-10 -mt-12'>
            <p className='flex p-2'>
              <img
                className='flex-shrink-0 w-6 h-6 mr-3'
                src={Table}
                alt='table'
              />
              {t('Edit Movie')}
            </p>
            <button className='flex p-2 text-white bg-gray-500 hover:bg-gray-600 rounded-xl'>
              <img className='w-6 h-6' src={Eye} alt='eye' />
              <Link to={'/adminpanel/movies'}>{t('All Movies')}</Link>
            </button>
          </div>
          <form onSubmit={handleSubmit(updateMovie)} className='mt-10'>
            <div className='mb-6'>
              <label
                className='block mb-2 text-xs font-bold text-gray-700 uppercase'
                htmlFor='movie-en'
              >
                {t('Movie_en')}
              </label>
              <input
                className={`w-full p-2 border border-gray-400 rounded outline-none ${
                  errors.movieEn && 'w-full p-2 border-2 border-red-700 rounded'
                }`}
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
                className={`w-full p-2 border border-gray-400 rounded outline-none ${
                  errors.movieKa && 'w-full p-2 border-2 border-red-700 rounded'
                }`}
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
              <Button flash={message} title='Update' />
              <FlashMessage flash={message} />
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
}

export default Update;
