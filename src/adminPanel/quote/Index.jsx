import React, { Fragment, useEffect, useState } from 'react';

import Table from '../../img/table.svg';
import Plus from '../../img/plus.svg';
import Pen from '../../img/pen.svg';
import Delete from '../../img/delete.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Index() {
  const [quotes, setQuotes] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getQuotes();
  }, []);

  const getQuotes = () => {
    setIsLoading(true);
    axios
      .get('quotes')
      .then((res) => {
        setQuotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
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
              All Quotes
            </p>
            <button className='flex p-2 text-white bg-green-500 hover:bg-green-600 rounded-xl'>
              <img src={Plus} className='w-6 h-6' alt='plus' />
              <Link to='create-quote'>Create Quote</Link>
            </button>
          </div>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                >
                  Id
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                >
                  Movies_en
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                >
                  Movies_ka
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                >
                  Quotes_en
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                >
                  Quotes_ka
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                >
                  Image
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
              {quotes.data.map((quote) => (
                <tr className='bg-white' key={quote.id}>
                  <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
                    {quote.id}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                    {quote.movie.movie.en}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                    {quote.movie.movie.ka}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                    {quote.quote.en}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                    {quote.quote.ka}
                  </td>
                  <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
                    <img
                      key={quote.id}
                      src={`http://localhost:8000/storage/${quote.thumbnail}`}
                      width='64'
                      height='64'
                      alt='movie img'
                    />
                  </td>
                  <td className='text-sm font-medium text-right whitespace-nowrap'>
                    <form action="{{ route('quotes.edit',['quote'=>$post->id])}}">
                      <button>
                        <img src={Pen} className='w-6 h-6' alt='edit-pen' />
                      </button>
                    </form>
                  </td>
                  <td className='text-sm font-medium text-center whitespace-nowrap'>
                    <form action='quotes.destroy' method='POST'>
                      <button>
                        <img src={Delete} className='w-6 h-6' alt='delete' />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>1 2 3</div>
        </div>
      )}
      {!isLoading && !quotes && (
        <h1 className='text-5xl text-center text-white py-96'>
          No posts have been added yet
        </h1>
      )}
      {isLoading && (
        <h1 className='text-5xl text-center text-white py-96'>Loading...</h1>
      )}
    </Fragment>
  );
}

export default Index;
