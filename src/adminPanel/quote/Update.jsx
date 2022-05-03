import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from 'components/adminPanelComponents/Button';
import Title from 'components/Title';
import Nameless from 'components/adminPanelComponents/Nameless';
import { EyeIcon, TableIcon } from '@heroicons/react/outline';
import toast, { Toaster } from 'react-hot-toast';
import i18n from 'language/i18next';

function Update() {
  Title('Quote | Update');
  const { t } = useTranslation();
  const [id, setID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState();
  const [movies, setMovie] = useState([]);
  const [defImage, setDefImage] = useState('');
  const [movieQuoteImg, setMovieQuoteImg] = useState('');
  const emptyValueMessage = `${t('Value is required')}`;
  const emptySelectMessage = `${t('The film is not selected')}`;
  const errorMessage = `${t('failed_to_update')}`;
  const successfullyMessage = `${t('successfully_updated!')}`;
  const networkErrorMessage = `${t('network_error')}`;
  const methodNotAllowedMessage = `${t('method_not_allowed')}`;

  const imageHandler = (e) => {
    if (e) {
      const File = e[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setMovieQuoteImg(reader.result);
        }
      };

      if (File) {
        reader.readAsDataURL(File);
      }
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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
          setDefImage(res.data.quote.thumbnail);
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
  }, [getQuote]);

  const updateQuote = async (data) => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    if (data.image[0]) {
      formData.append('thumbnail', data.image[0]);
    }
    formData.append('movie_id', data.movieId);
    formData.append('quote[en]', data.quoteEn);
    formData.append('quote[ka]', data.quoteKa);
    try {
      await axios(`quotes/${id}/update`, {
        data: formData,
        method: 'POST',
      })
        .then((res) => {
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
    <Fragment>
      <Toaster />
      {!isLoading && quote && (
        <div>
          <Nameless
            icon={<TableIcon />}
            btnIcon={<EyeIcon />}
            title='Edit Quote'
            path='/adminpanel/quotes'
            action='All Quotes'
          />
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
                {t('Quote_en')}
              </label>
              <input
                className={`w-full dark:bg-slate-800 dark:text-slate-600 dark:border-slate-700 p-2 border border-gray-400 rounded outline-none ${
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
                {t('Quote_ka')}
              </label>
              <input
                className={`w-full dark:bg-slate-800 dark:text-slate-600 dark:border-slate-700 p-2 border border-gray-400 rounded outline-none ${
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
            <label className='block mb-2 text-xs font-bold text-gray-700 uppercase'>
              {t('Choose a movie')}
            </label>

            <div className='mb-6'>
              <select
                className='  dark:bg-slate-800 dark:text-slate-600 dark:border-slate-700
               form-select 
               block 
               px-3 
               py-1.5 
               font-normal
               text-gray-700
               bg-white bg-clip-padding bg-no-repeat
               border border-solid border-gray-300
               rounded
               transition
               ease-in-out
               m-0
             focus:text-gray-700 
             focus:bg-white 
             focus:border-blue-600 
             focus:outline-none'
                aria-label='Default select example'
                name='movie-id'
                {...register('movieId', {
                  required: emptySelectMessage,
                })}
              >
                {movies.map((movie) => (
                  <option value={movie.id} key={movie.id}>
                    {movie.movie[i18n.language]}
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
              <div className='overflow-hidden rounded-lg md:max-w-xl'>
                <div className=' md:flex'>
                  <div className='w-full'>
                    <div className='relative flex items-center justify-center h-48 border border-gray-500 border-dashed rounded-lg'>
                      <input
                        type='file'
                        className='absolute z-20 w-full h-full opacity-0 cursor-pointer '
                        name='image'
                        accept='image/*'
                        onChange={imageHandler(watch('image'))}
                        {...register('image')}
                      />
                      <div className='z-10 w-auto h-auto'>
                        {movieQuoteImg && (
                          <img
                            className='w-full h-full'
                            src={movieQuoteImg}
                            alt='imageFile'
                          />
                        )}
                        {!movieQuoteImg && (
                          <img
                            src={`${process.env.REACT_APP_ENV_IMAGE}${defImage}`}
                            alt='default'
                            className='w-full h-full'
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex mb-6 w-min'>
              <div className='flex mb-6 w-min'>
                <Button title='Update' />
              </div>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
}

export default Update;
