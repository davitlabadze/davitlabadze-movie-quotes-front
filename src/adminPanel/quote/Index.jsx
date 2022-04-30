import React, { Fragment, useEffect, useState } from 'react';

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
import Loading from 'components/Loading';
import NoInfromationAvailable from 'components/NoInfromationAvailable';
import Nameless from 'components/adminPanelComponents/Nameless';

function Index() {
  Title('AdminPanel | Quotes');
  const { t } = useTranslation();
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getQuotes();
  }, []);

  const getQuotes = async () => {
    setIsLoading(true);
    try {
      await axios
        .get('quotes')
        .then((res) => {
          setQuotes(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };
  const deleteQuote = async (id) => {
    try {
      await axios
        .delete(`quotes/${id}`)
        .then((res) => {
          getQuotes();
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
      <Nameless
        icon={<TableIcon />}
        btnIcon={<PlusIcon />}
        title='All Quotes'
        path='create-quote'
        action='Add Quote'
      />
      {!isLoading && quotes.length > 0 && (
        <div>
          <table className='w-full text-center divide-y divide-gray-200 shadow-md dark:divide-slate-700 '>
            <TableThead
              title={[
                `${t('id')}`,
                `${t('Movie_en')}`,
                `${t('Movie_ka')}`,
                `${t('Quote_en')}`,
                `${t('Quote_ka')}`,
                `${t('image')}`,
                `${t('action')}`,
              ]}
            />
            <tbody className='flex flex-col items-center w-full overflow-x-hidden overflow-y-scroll bg-white dark:bg-slate-800 rounded-b-md h-96 '>
              {quotes.map((quote) => (
                <tr
                  className='flex w-full bg-white dark:bg-slate-800'
                  key={quote.id}
                >
                  <td className='w-1/4 p-4 px-6 text-gray-900 dark:text-slate-600'>
                    {quote.id}
                  </td>
                  <td className='w-1/4 p-4 px-6 text-gray-500 dark:text-slate-600'>
                    {quote.movie.movie.en}
                  </td>
                  <td className='w-1/4 p-4 px-6 text-gray-500 dark:text-slate-600'>
                    {quote.movie.movie.ka}
                  </td>
                  <td className='w-1/4 p-4 px-6 text-gray-500 dark:text-slate-600'>
                    {quote.quote.en}
                  </td>
                  <td className='w-1/4 p-4 px-6 text-gray-500 dark:text-slate-600'>
                    {quote.quote.ka}
                  </td>
                  <td className='w-1/4 p-4 px-6 text-gray-500 dark:text-slate-600'>
                    <img
                      className='ml-14 '
                      key={quote.id}
                      src={`${process.env.REACT_APP_ENV_IMAGE}${quote.thumbnail}`}
                      width='64'
                      height='64'
                      alt='movie img'
                    />
                  </td>
                  <td className='w-1/4 p-4 px-6 text-center '>
                    <Link to={`/adminpanel/quotes/${quote.id}/edit`}>
                      <button className='ml-4'>
                        <PencilIcon className='w-6 h-6 dark:text-slate-600 hover:dark:text-slate-700' />
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteQuote(quote.id)}
                      className='ml-2'
                    >
                      <TrashIcon className='w-6 h-6 dark:text-slate-600' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!isLoading && quotes.length === 0 && <NoInfromationAvailable />}
      {isLoading && <Loading />}
    </Fragment>
  );
}

export default Index;
