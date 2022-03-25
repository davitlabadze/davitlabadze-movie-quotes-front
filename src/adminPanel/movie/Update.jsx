import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Table from '../../img/table.svg';
import Eye from '../../img/eye.svg';

function Update() {
  const [id, setID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editMovie, setEditMovie] = useState();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const params = useParams();

  useEffect(() => {
    getEditMovie();
  }, []);

  const getEditMovie = () => {
    setIsLoading(true);
    axios
      .get(`movies/${params.movieId}/edit`)
      .then((res) => {
        setEditMovie(res.data);
        setID(res.data.id);
        setValue('movieEn', res.data.movie.en);
        setValue('movieKa', res.data.movie.ka);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const updateMovie = (data) => {
    axios
      .put(`movies/${id}/edit`, {
        'movie-en': data.movieEn,
        'movie-ka': data.movieKa,
      })
      .then((res) => {
        getEditMovie();
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      {!isLoading && editMovie && (
        <div>
          <div className='flex p-2 mb-10 -mt-12'>
            <p className='flex p-2'>
              <img
                className='flex-shrink-0 w-6 h-6 mr-3'
                src={Table}
                alt='table'
              />
              Edit Movie
            </p>
            <button className='flex p-2 text-white bg-gray-500 hover:bg-gray-600 rounded-xl'>
              <img className='w-6 h-6' src={Eye} alt='eye' />
              <Link to={'/adminpanel/movies'}>All Movies</Link>
            </button>
          </div>
          <form onSubmit={handleSubmit(updateMovie)} className='mt-10'>
            <div className='mb-6'>
              <label
                className='block mb-2 text-xs font-bold text-gray-700 uppercase'
                htmlFor='movie-en'
              >
                Movie (EN)
              </label>
              <input
                className={`w-full p-2 border border-gray-400 rounded outline-none ${
                  errors.movieEn && 'w-full p-2 border-2 border-red-700 rounded'
                }`}
                type='text'
                name='movie-en'
                id='movie-en'
                {...register('movieEn', {
                  required: 'Value is required',
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
                Movie (KA)
              </label>
              <input
                className={`w-full p-2 border border-gray-400 rounded outline-none ${
                  errors.movieKa && 'w-full p-2 border-2 border-red-700 rounded'
                }`}
                type='text'
                name='movie-ka'
                id='movie-ka'
                {...register('movieKa', { required: 'Value is required' })}
              />
              {errors.movieKa && (
                <p className='mt-2 text-xs text-red-500'>
                  {errors.movieKa.message}
                </p>
              )}
            </div>
            <div className='mb-6 w-min'>
              <button
                onClick={updateMovie}
                type='submit'
                className='w-full px-4 py-2 text-white bg-green-600 rounded-lg rounderd hover:bg-green-700'
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
}

export default Update;
