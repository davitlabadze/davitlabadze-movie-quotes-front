import React, { Fragment, useEffect, useState } from 'react';

import Table from 'adminPanel/img/table.svg';
import Plus from 'adminPanel/img/plus.svg';
import Pen from 'adminPanel/img/pen.svg';
import Delete from 'adminPanel/img/delete.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Title from 'components/Title';
function Index() {
  Title('AdminPanel | Quotes');
  const { t } = useTranslation();
  const [quotes, setQuotes] = useState();
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
      {!isLoading && quotes && (
        <div>
          <div className='flex p-2 mb-10 -mt-12'>
            <p className='flex p-2'>
              <img
                className='flex-shrink-0 w-6 h-6 mr-3'
                src={Table}
                alt='table'
              />
              {t('All Quotes')}
            </p>
            <button className='flex p-2 text-white bg-green-500 hover:bg-green-600 rounded-xl'>
              <img src={Plus} className='w-6 h-6' alt='plus' />
              <Link to='create-quote'>{t('Add Quote')}</Link>
            </button>
          </div>
          <table className='w-full text-center divide-y divide-gray-200 rounded-md drop-shadow-md'>
            <thead className='flex w-full text-white bg-gray-50'>
              <tr className='flex w-full mb-2'>
                <th className='w-1/4 p-2 text-xs text-gray-500 uppercase'>
                  Id
                </th>
                <th className='w-1/4 p-2 text-xs text-gray-500 uppercase'>
                  Movie_en
                </th>
                <th className='w-1/4 p-2 text-xs text-gray-500 uppercase'>
                  Movie_ka
                </th>
                <th className='w-1/4 p-2 text-xs text-gray-500 uppercase'>
                  Quote_en
                </th>
                <th className='w-1/4 p-2 text-xs text-gray-500 uppercase'>
                  Quote_ka
                </th>
                <th className='w-1/4 p-2 text-xs text-gray-500 uppercase'>
                  Image
                </th>
                <th className='w-1/4 p-2 text-xs text-gray-500 uppercase'>
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            <tbody className='flex flex-col items-center w-full overflow-x-hidden overflow-y-scroll h-96 '>
              {quotes.map((quote) => (
                <tr className='flex w-full bg-white' key={quote.id}>
                  <td className='w-1/4 p-4 px-6 text-gray-900'>{quote.id}</td>
                  <td className='w-1/4 p-4 px-6 text-gray-500'>
                    {quote.movie.movie.en}
                  </td>
                  <td className='w-1/4 p-4 px-6 text-gray-500'>
                    {quote.movie.movie.ka}
                  </td>
                  <td className='w-1/4 p-4 px-6 text-gray-500'>
                    {quote.quote.en}
                  </td>
                  <td className='w-1/4 p-4 px-6 text-gray-500'>
                    {quote.quote.ka}
                  </td>
                  <td className='w-1/4 p-4 px-6 text-gray-500'>
                    <img
                      className='ml-14 '
                      key={quote.id}
                      src={`http://localhost:8000/storage/${quote.thumbnail}`}
                      width='64'
                      height='64'
                      alt='movie img'
                    />
                  </td>
                  <td className='w-1/4 p-4 px-6 text-center '>
                    <Link to={`/adminpanel/quotes/${quote.id}/edit`}>
                      <button className='ml-4'>
                        <img src={Pen} className='w-6 h-6' alt='edit-pen' />
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteQuote(quote.id)}
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
      {!isLoading && !quotes && (
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
