import React, { useState } from 'react';

import Table from '../../img/table.svg';
import Eye from '../../img/eye.svg';
import axios from 'axios';

function Create() {
  const [movieEn, setMovieEn] = useState('');
  const [movieKa, setMovieKa] = useState('');
  const [formInputsValidaty, setFormInputsValidaty] = useState({
    movieEN: true,
    movieKA: true,
  });

  const isEmpty = (value) => value.trim() === '';
  const postData = (e) => {
    e.preventDefault();
    setMovieEn('');
    setMovieKa('');
    const formData = new FormData();
    formData.append('movie-en', movieEn);
    formData.append('movie-ka', movieKa);

    const enterMovieEnIsValid = !isEmpty(movieEn);
    const enterMovieKaIsValid = !isEmpty(movieKa);
    setFormInputsValidaty({
      movieEN: enterMovieEnIsValid,
      movieKA: enterMovieKaIsValid,
    });
    const formIsValid = enterMovieEnIsValid && enterMovieKaIsValid;

    if (!formIsValid) {
      return;
    }

    axios
      .post('movies/create', formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className='flex p-2 mb-10 -mt-12'>
        <p className='flex p-2'>
          <img className='flex-shrink-0 w-6 h-6 mr-3' src={Table} alt='table' />
          Add Movie
        </p>
        <button className='flex p-2 text-white bg-gray-500 hover:bg-gray-600 rounded-xl'>
          <img className='w-6 h-6' src={Eye} alt='eye' />
          <a href='movie.index'>All Data</a>
        </button>
      </div>
      <form className='mt-10'>
        <div className='mb-6'>
          <label
            className='block mb-2 text-xs font-bold text-gray-700 uppercase'
            htmlFor='movie_{{ $locale }}'
          >
            Movie_EN
          </label>
          <input
            className={
              !formInputsValidaty.movieEN
                ? 'w-full p-2 border-2 border-red-700 rounded'
                : 'w-full p-2 border border-gray-400 rounded outline-blue-700'
            }
            type='text'
            name='movie-en'
            id='movie-en'
            value={movieEn}
            onChange={(e) => setMovieEn(e.target.value)}
          />
          {!formInputsValidaty.movieEN && (
            <p className='mt-2 text-xs text-red-500'>Value is required</p>
          )}
        </div>

        <div className='mb-6'>
          <label
            className='block mb-2 text-xs font-bold text-gray-700 uppercase'
            htmlFor='movie_ka'
          >
            Movie_KA
          </label>
          <input
            className={
              !formInputsValidaty.movieKA
                ? 'w-full p-2 border-2 border-red-700 rounded'
                : 'w-full p-2 border border-gray-400 rounded outline-blue-700'
            }
            type='text'
            name='movie-ka'
            id='movie-ka'
            value={movieKa}
            onChange={(e) => setMovieKa(e.target.value)}
          />
          {!formInputsValidaty.movieKA && (
            <p className='mt-2 text-xs text-red-500'>Value is required</p>
          )}
        </div>

        <div className='flex mb-6 w-min'>
          <button
            onClick={postData}
            type='submit'
            className='w-full px-4 py-2 text-white bg-green-600 rounded-lg rounderd hover:bg-green-700'
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
