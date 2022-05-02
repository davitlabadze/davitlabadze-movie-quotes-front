import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FlashMessage from 'components/adminPanelComponents/FlashMessage';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Button from 'components/adminPanelComponents/Button';
import Title from 'components/Title';
import { EyeIcon, TableIcon } from '@heroicons/react/outline';
import Nameless from 'components/adminPanelComponents/Nameless';
function Create() {
  Title('Quote | Create');
  const [message, setMessage] = useState('');
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState,
    formState: { errors },
  } = useForm();

  const [movies, setMovie] = useState([]);
  const [movieQuoteImg, setMovieQuoteImg] = useState('');

  const emptyValue = `${t('Value is required')}`;
  const emptySelect = `${t('The film is not selected')}`;
  const emptyImage = `${t('No_image_chosen')}`;

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
      formData.append('quote[en]', data.quoteEn);
      formData.append('quote[ka]', data.quoteKa);
      formData.append('movie_id', data.movieId);
      formData.append('thumbnail', data.image[0]);

      await axios
        .post('quotes/create', formData)
        .then((res) => {
          console.log(data);
          setMessage('successfully!');
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Nameless
        icon={<TableIcon />}
        btnIcon={<EyeIcon />}
        title='Add Quote'
        path='/adminpanel/quotes'
        action='All Quotes'
      />
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
            {t('Quote_en')}
          </label>
          <input
            className={`w-full dark:bg-slate-800 dark:text-slate-600 dark:border-slate-700 p-2 border border-gray-400 rounded outline-none ${
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
            {t('Quote_ka')}
          </label>
          <input
            className={`w-full dark:bg-slate-800 dark:text-slate-600 dark:border-slate-700 p-2 border border-gray-400 rounded outline-none ${
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
        <label className='block mb-2 text-xs font-bold text-gray-700 uppercase'>
          {t('Choose a movie')}
        </label>
        <div className='mb-6 '>
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
          <div className='overflow-hidden rounded-lg md:max-w-xl'>
            <div className=' md:flex'>
              <div className='w-full'>
                <div
                  className={`relative flex items-center justify-center h-48 border  border-dashed rounded-lg ${
                    errors.image ? 'border-red-500' : 'border-gray-500'
                  }`}
                >
                  <label
                    className='absolute mb-2 text-xl font-bold text-gray-700 uppercase'
                    htmlFor='image'
                  >
                    {!errors.image && <p>{t('choose_image')}</p>}
                    {errors.image && (
                      <p className='text-red-500'>{errors.image.message}</p>
                    )}
                  </label>
                  <input
                    type='file'
                    className='absolute z-20 w-full h-full opacity-0 cursor-pointer '
                    name='image'
                    accept='image/*'
                    onChange={imageHandler(watch('image'))}
                    {...register('image', { required: emptyImage })}
                  />

                  <div className='z-10 w-auto h-auto'>
                    {movieQuoteImg && (
                      <img
                        className='w-full h-full'
                        src={movieQuoteImg}
                        alt='imageFile'
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
            <Button flash={message} title='Create' />
            <FlashMessage flash={message} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create;
