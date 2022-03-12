import React from 'react';
import Movies from '../img/movies.svg';
import Quotes from '../img/quotes.svg';
import Recent from '../img/recent.svg';

function Dashboard() {
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
                {/* total:{{ $moviesCount }} */} total: 5
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
                {/* total:{{ $quotesCount }} */} total: 4
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
          <tr className='bg-white'>
            <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
              1
            </td>
            <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
              thor
            </td>
            <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
              თორი
            </td>
            {/* @endforeach */}
            <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
              Of Course
            </td>
            <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
              რათქმაუნდა
            </td>
            <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
              <img
                src='https://www.looper.com/img/gallery/the-real-reason-for-hemsworths-endgame-anger/intro-1571158290.jpg'
                alt='img'
                width='64'
                height='64'
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div>here pagination 1 2 3</div>
    </div>
  );
}

export default Dashboard;
