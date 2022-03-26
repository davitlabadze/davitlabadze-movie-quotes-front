import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Movies from '../img/movies.svg';
import Quotes from '../img/quotes.svg';
import Recent from '../img/recent.svg';

function Dashboard() {
  const [data, setData] = useState({
    moviesCount: '',
    quotesCount: '',
    quotes: [],
  });

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = () => {
    axios
      .get('dashboard')
      .then((res) => {
        setData((datas) => {
          return {
            ...datas,
            moviesCount: res.data.moviesCount,
            quotesCount: res.data.quotesCount,
            quotes: res.data.quotes.data,
          };
        });

        // setData(res.data.moviesCount);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-4'>
        <div className='relative flex items-center px-6 py-5 space-x-3 bg-red-500 border rounded-lg shadow-sm hover:bg-red-600'>
          <div className='flex-shrink-0'>
            <img
              src={Movies}
              className='flex-shrink-0 w-6 h-6 mr-3 text-white'
              alt='movies'
            />
          </div>
          <div className='flex-1 min-w-0'>
            <a
              href="{{ route('movies.index') }}"
              className='focus:outline-none'
            >
              <p className='text-sm font-medium text-white'>All Movies</p>
              <p className='text-sm text-white truncate'>
                total: {data.moviesCount}
              </p>
            </a>
          </div>
        </div>
        <div className='relative flex items-center px-6 py-5 space-x-3 bg-blue-500 border rounded-lg shadow-sm hover:bg-blue-600'>
          <div className='flex-shrink-0'>
            <img
              src={Quotes}
              className='flex-shrink-0 w-6 h-6 mr-3'
              alt='quotes'
            />
          </div>
          <div className='flex-1 min-w-0'>
            <a
              href="{{ route('quotes.index') }}"
              className='focus:outline-none'
            >
              <p className='text-sm font-medium text-white'>All Quotes</p>
              <p className='text-sm text-white truncate'>
                total: {data.quotesCount}
              </p>
            </a>
          </div>
        </div>
      </div>
      <div className='flex py-3 mt-10 '>
        <img src={Recent} className='flex-shrink-0 w-6 h-6 mr-3' alt='recent' />
        Recent Movies quotes
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
          </tr>
        </thead>
        <tbody>
          {data.quotes.map((quote) => (
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
                  src={`http://localhost:8000/storage/${quote.thumbnail}`}
                  alt='img'
                  width='64'
                  height='64'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>here pagination 1 2 3</div>
    </div>
  );
}

export default Dashboard;
