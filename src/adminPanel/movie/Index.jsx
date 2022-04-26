import React, { Fragment, useEffect, useState } from 'react';
import Table from 'adminPanel/img/table.svg';
import Plus from 'adminPanel/img/plus.svg';
import Pen from 'adminPanel/img/pen.svg';
import Delete from 'adminPanel/img/delete.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Title from 'components/Title';
import TableThead from 'components/adminPanelComponents/TableThead';
function Index() {
  Title('AdminPanel | Movies');
  const { t } = useTranslation();
  const [movies, setMovies] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    setIsLoading(true);
    try {
      await axios
        .get('movies')
        .then((res) => {
          setMovies(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const deleteMovie = async (id) => {
    try {
      await axios
        .delete(`movies/${id}`)
        .then((res) => {
          getMovies();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
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

          <table className='w-full text-center divide-y divide-gray-200 rounded-md drop-shadow-md'>
            <TableThead
              title={[
                `${t('id')}`,
                `${t('Movie_en')}`,
                `${t('Movie_ka')}`,
                `${t('action')}`,
              ]}
            />
            <tbody className='flex flex-col items-center w-full overflow-x-hidden overflow-y-scroll h-96 '>
              {movies.map((movie) => (
                <tr className='flex w-full bg-white' key={movie.id}>
                  <td className='w-1/4 p-4 px-6 text-gray-900'>{movie.id}</td>
                  <td className='w-1/4 p-4 px-6 text-gray-500'>
                    {movie.movie.en}
                  </td>
                  <td className='w-1/4 p-4 px-6 text-gray-500'>
                    {movie.movie.ka}
                  </td>
                  <td className='w-1/4 p-4 px-6 text-center '>
                    <Link to={`/adminpanel/movies/${movie.id}/edit`}>
                      <button className='ml-4'>
                        <img src={Pen} className='w-6 h-6' alt='edit-pen' />
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteMovie(movie.id)}
                      className='ml-2'
                    >
                      <img src={Delete} className='w-6 h-6' alt='delete' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
