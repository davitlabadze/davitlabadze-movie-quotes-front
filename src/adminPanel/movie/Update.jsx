import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import Table from '../../img/table.svg';
import Eye from '../../img/eye.svg';

function Update() {
  const [id, setID] = useState(null);
  const [movieEn, setMovieEn] = useState('');
  const [movieKa, setMovieKa] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editMovie, setEditMovie] = useState();
  const [formInputsValidaty, setFormInputsValidaty] = useState({
    movieEN: true,
    movieKA: true,
  });

  const isEmpty = (value) => value.trim() === '';
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
        setMovieEn(res.data.movie.en);
        setMovieKa(res.data.movie.ka);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  const updateMovie = (e) => {
    e.preventDefault();
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
      .put(`movies/${id}/edit`, {
        'movie-en': movieEn,
        'movie-ka': movieKa,
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
              <Link to={'/adminpanel/movies'}>All Data</Link>
            </button>
          </div>
          <form className='mt-10'>
            <div className='mb-6'>
              <label
                className='block mb-2 text-xs font-bold text-gray-700 uppercase'
                htmlFor='movie-en'
              >
                Movie (EN)
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
                onChange={(e) => setMovieEn(e.target.value)}
                value={movieEn}
              />
              {!formInputsValidaty.movieEN && (
                <p className='mt-2 text-xs text-red-500'>Value is required</p>
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
