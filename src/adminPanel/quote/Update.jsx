import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import FlashMessage from '../../components/forAdminPanel/FlashMessage';
import Table from '../../img/table.svg';
import Eye from '../../img/eye.svg';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Update() {
  const { t } = useTranslation();
  const [id, setID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState();
  const [message, setMessage] = useState('');
  const [movies, setMovie] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const params = useParams();

  const getQuote = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios
        .get(`quotes/${params.quoteId}/edit`)
        .then((res) => {
          setQuote(res.data);
          setID(res.data.quote.id);
          setValue('quoteEn', res.data.quote.quote.en);
          setValue('quoteKa', res.data.quote.quote.ka);
          setMovie(res.data.movies);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }, [params.quoteId, setValue]);

  useEffect(() => {
    getQuote();
    const timer = setTimeout(() => {
      setMessage('');
    }, 2000);
    return () => clearTimeout(timer);
  }, [message, getQuote]);

  const updateQuote = async (data) => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('thumbnail', data.image[0]);
    formData.append('movie-id', data.movieId);
    formData.append('quote-en', data.quoteEn);
    formData.append('quote-ka', data.quoteKa);
    try {
      await axios(`quotes/${id}/update`, {
        data: formData,
        method: 'POST',
      }).then((res) => setMessage('successfully!'));
    } catch (error) {
      throw new Error('Error');
    }
  };

  const emptyValueMessage = `${t('Value is required')}`;
  const emptySelectMessage = `${t('The film is not selected')}`;

  return (
    <Fragment>
      {!isLoading && quote && (
        <div>
          <div className='flex p-2 mb-10 -mt-12'>
            <p className='flex p-2'>
              <img
                className='flex-shrink-0 w-6 h-6 mr-3'
                src={Table}
                alt='table'
              />
              {t('Edit Quote')}
            </p>
            <button className='flex p-2 text-white bg-gray-500 hover:bg-gray-600 rounded-xl'>
              <img className='w-6 h-6' src={Eye} alt='eye' />
              <Link to={'/adminpanel/quotes'}>{t('All Quotes')}</Link>
            </button>
          </div>

          <form
            method='POST'
            onSubmit={handleSubmit(updateQuote)}
            className='mt-10'
          >
            <div className='mb-6'>
              <label
                className='block mb-2 text-xs font-bold text-gray-700 uppercase'
                htmlFor='quote-en'
              >
                Quote (EN)
              </label>
              <input
                className={`w-full p-2 border border-gray-400 rounded outline-none ${
                  errors.quoteEn && 'w-full p-2 border-2 border-red-700 rounded'
                }`}
                type='text'
                name='quote-en'
                id='quote-en'
                {...register('quoteEn', {
                  required: emptyValueMessage,
                })}
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
                Quote (KA)
              </label>
              <input
                className={`w-full p-2 border border-gray-400 rounded outline-none ${
                  errors.quoteKa && 'w-full p-2 border-2 border-red-700 rounded'
                }`}
                type='text'
                name='quote-ka'
                id='quote-ka'
                {...register('quoteKa', { required: emptyValueMessage })}
              />

              {errors.quoteKa && (
                <p className='mt-2 text-xs text-red-500'>
                  {errors.quoteKa.message}
                </p>
              )}
            </div>
            <div className='mb-6'>
              <select
                name='movie-id'
                {...register('movieId', {
                  required: emptySelectMessage,
                })}
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
                {...register('image', { required: emptyValueMessage })}
              />
              {errors.image && (
                <p className='mt-2 text-xs text-red-500'>
                  {errors.image.message}
                </p>
              )}
            </div>
            <div className='flex mb-6 w-min'>
              <button
                type='submit'
                className='w-full px-4 py-2 text-white bg-green-600 rounded-lg rounderd hover:bg-green-700'
              >
                {t('Update')}
              </button>
              <FlashMessage flash={message} />
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
}

export default Update;
