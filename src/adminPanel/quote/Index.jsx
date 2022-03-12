import React from 'react';

import Table from '../../img/table.svg';
import Plus from '../../img/plus.svg';
import Pen from '../../img/pen.svg';
import Delete from '../../img/delete.svg';

function Index() {
  return (
    <div>
      <div className='flex p-2 mb-10 -mt-12'>
        <p className='flex p-2'>
          <img className='flex-shrink-0 w-6 h-6 mr-3' src={Table} alt='table' />
          All Quotes
        </p>
        <button className='flex p-2 text-white bg-green-500 hover:bg-green-600 rounded-xl'>
          <img src={Plus} className='w-6 h-6' alt='plus' />
          <a href='quotes.create'>Create Data</a>
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
              colspan='2'
              className='px-2 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase '
            >
              <span className=''>Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className='bg-white'>
            <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
              1
            </td>
            <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
              Thor
            </td>
            <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
              თორი
            </td>
            <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
              of course
            </td>
            <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
              რათქმაუნდა
            </td>
            <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
              <img
                src='https://www.looper.com/img/gallery/the-real-reason-for-hemsworths-endgame-anger/intro-1571158290.jpg'
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
        </tbody>
      </table>
      <div>1 2 3</div>
    </div>
  );
}

export default Index;
