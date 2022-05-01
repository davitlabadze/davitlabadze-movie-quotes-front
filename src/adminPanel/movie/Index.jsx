import React, { Fragment, useEffect, useState } from 'react';
import i18n from 'i18next';
import {
  TableIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/outline';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Title from 'components/Title';
import TableThead from 'components/adminPanelComponents/TableThead';
import Loading from 'components/adminPanelComponents/Loading';
import NoInfromationAvailable from 'components/adminPanelComponents/NoInfromationAvailable';
import Nameless from 'components/adminPanelComponents/Nameless';
function Index() {
  Title('AdminPanel | Movies');
  const { t } = useTranslation();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
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

  const filteredCountries = movies.filter((movie) => {
    return movie.movie[i18n.language]
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  return (
    <Fragment>
      <Nameless
        icon={<TableIcon />}
        btnIcon={<PlusIcon />}
        title='All Movies'
        path='create-data'
        action='Add Movie'
      />
      <div className='mt-20'>
        <input
          onChange={(e) => setSearch(e.target.value)}
          name='search'
          type='search'
          id='search'
          placeholder='Search by movie'
          className='p-2 px-12 mb-4 bg-no-repeat rounded-lg shadow-sm outline-none dark:bg-slate-800 dark:text-slate-500 bg bg-left-1 bg-search'
        />
      </div>
      <div>
        <table className='w-full text-center divide-y divide-gray-200 shadow-md dark:divide-slate-700 '>
          <TableThead
            title={[
              `${t('id')}`,
              `${t('Movie_en')}`,
              `${t('Movie_ka')}`,
              `${t('action')}`,
            ]}
          />
          <tbody className='flex flex-col items-center w-full overflow-x-hidden overflow-y-scroll bg-white dark:bg-slate-800 rounded-b-md h-96 '>
            {!isLoading &&
              movies.length > 0 &&
              filteredCountries.map((movie) => (
                <tr
                  className='flex w-full bg-white dark:bg-slate-800'
                  key={movie.id}
                >
                  <td className='w-1/4 p-4 px-6 text-gray-900 dark:text-slate-600'>
                    {movie.id}
                  </td>
                  <td className='w-1/4 p-4 px-6 text-gray-500 dark:text-slate-600'>
                    {movie.movie.en}
                  </td>
                  <td className='w-1/4 p-4 px-6 text-gray-500 dark:text-slate-600'>
                    {movie.movie.ka}
                  </td>
                  <td className='w-1/4 p-4 px-6 text-center '>
                    <Link to={`/adminpanel/movies/${movie.id}/edit`}>
                      <button className='ml-4'>
                        <PencilIcon className='w-6 h-6 dark:text-slate-600 hover:dark:text-slate-700' />
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteMovie(movie.id)}
                      className='ml-2'
                    >
                      <TrashIcon className='w-6 h-6 dark:text-slate-600 hover:dark:text-slate-700' />
                    </button>
                  </td>
                </tr>
              ))}
            {!isLoading && movies.length === 0 && <NoInfromationAvailable />}
            {isLoading && <Loading />}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default Index;
