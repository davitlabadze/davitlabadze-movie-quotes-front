import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FlashMessage from 'components/adminPanelComponents/FlashMessage';
import Table from 'adminPanel/img/table.svg';
import Eye from 'adminPanel/img/eye.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Create() {
  const [message, setMessage] = useState('');
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm();

  const [movies, setMovie] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formState.isSubmitSuccessful) {
        setMessage('');
        reset({
          quoteEn: '',
          quoteKa: '',
          movieId: '',
          image: '',
        });
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [message, formState, reset]);

  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = async () => {
    try {
      await axios
        .get(`quotes/create`)
        .then((res) => {
          setMovie(res.data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
  };

  const createQuote = async (data) => {
    try {
      const formData = new FormData();
      formData.append('quote-en', data.quoteEn);
      formData.append('quote-ka', data.quoteKa);
      formData.append('movie-id', data.movieId);
      formData.append('thumbnail', data.image[0]);
      await axios
        .post('quotes/create', formData)
        .then((res) => {
          setMessage('successfully!');
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
  };
  const emptyValue = `${t('Value is required')}`;
  const emptySelect = `${t('The film is not selected')}`;

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
        onSubmit={handleSubmit(createQuote)}
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
            {...register('quoteEn', { required: emptyValue })}
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
            {...register('quoteKa', { required: emptyValue })}
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
            {...register('movieId', { required: emptySelect })}
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
            {...register('image', { required: emptyValue })}
          />
          {errors.image && (
            <p className='mt-2 text-xs text-red-500'>{errors.image.message}</p>
          )}
        </div>
        <div className='flex mb-6 w-min'>
          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-green-600 rounded-lg rounderd hover:bg-green-700'
          >
            {t('Create')}
          </button>
          <FlashMessage flash={message} />
        </div>
      </form>
    </div>
  );
}

export default Create;
