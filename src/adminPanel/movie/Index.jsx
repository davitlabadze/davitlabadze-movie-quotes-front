import React, { Fragment, useEffect, useState } from 'react';

import Table from '../../img/table.svg';
import Plus from '../../img/plus.svg';
import Pen from '../../img/pen.svg';
import Delete from '../../img/delete.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Index() {
  const { t } = useTranslation();
  const [movies, setMovies] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    setIsLoading(true);
    axios
      .get('movies')
      .then((res) => {
        setMovies(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  const deleteMovie = (id) => {
    axios
      .delete(`movies/${id}`)
      .then((res) => {
        console.log(res);
        getMovies();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      {!isLoading && movies && (
        <div>
          <div className='flex p-2 mb-10 -mt-12'>
            <p className='flex p-2'>
              <img
                className='flex-shrink-0 w-6 h-6 mr-3'
                src={Table}
                alt='table'
              />
              {t('All Movies')}
            </p>
            <button className='flex p-2 text-white bg-green-500 hover:bg-green-600 rounded-xl'>
              <img src={Plus} className='w-6 h-6' alt='plus' />

              <Link to='create-data'>{t('Add Movie')} </Link>
            </button>
          </div>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-6 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                >
                  Id
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                >
                  Movie_en
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                >
                  Movie_ka
                </th>
                <th
                  scope='col'
                  colSpan='2'
                  className='px-2 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase '
                >
                  <span className=''>Action</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {movies.data.map((movie) => (
                <tr className='bg-white' key={movie.id}>
                  <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
                    {movie.id}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                    {movie.movie.en}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                    {movie.movie.ka}
                  </td>

                  <td className='text-sm font-medium text-right whitespace-nowrap'>
                    <Link to={`/adminpanel/movies/${movie.id}/edit`}>
                      <button>
                        <img src={Pen} className='w-6 h-6' alt='edit-pen' />
                      </button>
                    </Link>
                  </td>
                  <td className='text-sm font-medium text-center whitespace-nowrap'>
                    <button onClick={() => deleteMovie(movie.id)}>
                      <img src={Delete} className='w-6 h-6' alt='delete' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>1 2 3</div>
        </div>
      )}
      {!isLoading && !movies && (
        <h1 className='text-5xl text-center text-white py-96'>
          {t('No information available')}
        </h1>
      )}
      {isLoading && (
        <h1 className='text-5xl text-center text-white py-96'>
          {t('Loading')}...
        </h1>
      )}
    </Fragment>
  );
}

export default Index;
