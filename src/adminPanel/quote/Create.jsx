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

  const [movieQuoteImg, setMovieQuoteImg] = useState(
    'https://www.dggb.org/wp-content/uploads/2020/09/British-film-and-television-directors-1.jpg'
  );

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setMovieQuoteImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
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
  const emptyValue = `${t('Value is required')}`;
  const emptySelect = `${t('The film is not selected')}`;

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

        <div className='mb-4'>
          <div className='max-w-md overflow-hidden rounded-lg md:max-w-xl '>
            <div className='md:flex '>
              <div className='w-full '>
                <div className='relative flex items-center justify-center h-48 border-2 border-gray-500 border-dashed rounded-lg dark:border-slate-600 '>
                  <div className='absolute '>
                    <div className='flex flex-col items-center '>
                      <span className='block font-normal text-gray-400 '>
                        Attach you files here
                      </span>
                    </div>
                  </div>

                  <input
                    type='file'
                    className='w-full h-full opacity-0 cursor-pointer '
                    name='image'
                    accept='image/*'
                    onChange={imageHandler}
                    // onChange={imageHandler(watch('image'))}
                    // {...register('image', { required: emptySelect })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {movieQuoteImg && (
          <img
            className='w-auto h-auto cursor-pointer '
            src={movieQuoteImg}
            alt=''
          />
        )}
        {/* <div className='mb-6'>
          <label
            className='block mb-2 text-xs font-bold text-gray-700 uppercase'
            htmlFor='image'
          >
            {t('image')}
          </label>
          <input
            className='block  dark:bg-slate-800 dark:text-slate-600 dark:border-slate-700 px-3 m-0 text-base font-normal py-1.5 text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded  form-control bg-clip-padding  cursor-pointer focus:text-gray-700 focus:bg-red-900 focus:border-blue-600 focus:outline-none'
            type='file'
            name='image'
            {...register('image', { required: emptySelect })}
          />
          {errors.image && (
            <p className='mt-2 text-xs text-red-500'>{errors.image.message}</p>
          )}
        </div> */}
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
