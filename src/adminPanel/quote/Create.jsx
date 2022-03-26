import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Table from '../../img/table.svg';
import Eye from '../../img/eye.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Create() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [movies, setMovie] = useState([]);

  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = () => {
    axios
      .get(`quotes/create`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('quote-en', data.quoteEn);
    formData.append('quote-ka', data.quoteKa);
    formData.append('movie-id', data.movieId);
    formData.append('thumbnail', data.image[0]);

    axios
      .post('quotes/create', formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className='flex p-2 mb-10 -mt-12'>
        <p className='flex p-2'>
          <img className='flex-shrink-0 w-6 h-6 mr-3' src={Table} alt='table' />
          {t('Add Quote')}
        </p>
        <button className='flex p-2 text-white bg-gray-500 hover:bg-gray-600 rounded-xl'>
          <img className='w-6 h-6' src={Eye} alt='eye' />
          <Link to='/adminpanel/quotes'>{t('All Quotes')}</Link>
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        method='POST'
        className='mt-10'
        encType='multipart/form-data'
      >
        <div className='mb-6'>
          <label
            className='block mb-2 text-xs font-bold text-gray-700 uppercase'
            htmlFor='quote-en'
          >
            Quotes (EN)
          </label>
          <input
            className={`w-full p-2 border border-gray-400 rounded outline-none ${
              errors.quoteEn && 'w-full p-2 border-2 border-red-700 rounded'
            }`}
            type='text'
            name='quote-en'
            id='quote-en'
            {...register('quoteEn', { required: 'Value is required' })}
          />
          {errors.quoteEn && (
            <p className='mt-2 text-xs text-red-500'>
              {errors.quoteEn.message}
            </p>
          )}
        </div>

        <div className='mb-6'>
          <label
            className='block mb-2 text-xs font-bold text-gray-700 uppercase'
            htmlFor='quote-ka'
          >
            Quotes (KA)
          </label>
          <input
            className={`w-full p-2 border border-gray-400 rounded outline-none ${
              errors.quoteKa && 'w-full p-2 border-2 border-red-700 rounded'
            }`}
            type='text'
            name='quote-ka'
            id='quote-ka'
            {...register('quoteKa', { required: 'Value is required' })}
          />
          {errors.quoteKa && (
            <p className='mt-2 text-xs text-red-500'>
              {errors.quoteKa.message}
            </p>
          )}
        </div>

        <div className='mb-6'>
          <select
            name='movie_id'
            {...register('movieId', { required: 'The film is not selected' })}
          >
            {movies.map((movie) => (
              <option value={movie.id} key={movie.id}>
                {movie.movie.en}
              </option>
            ))}
          </select>
          {errors.movieId && (
            <p className='mt-2 text-xs text-red-500'>
              {errors.movieId.message}
            </p>
          )}
        </div>

        <div className='mb-6'>
          <label
            className='block mb-2 text-xs font-bold text-gray-700 uppercase'
            htmlFor='text'
          >
            Image
          </label>
          <input
            type='file'
            name='image'
            {...register('image', { required: 'Value is required' })}
          />
          {errors.image && (
            <p className='mt-2 text-xs text-red-500'>{errors.image.message}</p>
          )}
        </div>
        <div className='mb-6 w-min'>
          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-green-600 rounded-lg rounderd hover:bg-green-700'
          >
            {t('Create')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
