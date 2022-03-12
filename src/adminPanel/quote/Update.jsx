import React from 'react';

import Table from '../../img/table.svg';
import Eye from '../../img/eye.svg';

function Update() {
  return (
    <div>
      <div className='flex p-2 mb-10 -mt-12'>
        <p className='flex p-2'>
          <img className='flex-shrink-0 w-6 h-6 mr-3' src={Table} alt='table' />
          Edit Quote
        </p>
        <button className='flex p-2 text-white bg-gray-500 hover:bg-gray-600 rounded-xl'>
          <img className='w-6 h-6' src={Eye} alt='eye' />
          <a href='quotes.index'>All Data</a>
        </button>
      </div>

      <form
        action='quptes.update'
        method='POST'
        className='mt-10'
        enctype='multipart/form-data'
      >
        <div className='mb-6'>
          <label
            className='block mb-2 text-xs font-bold text-gray-700 uppercase'
            for='quote_{{ $locale }}'
          >
            Quote (EN)
          </label>
          <input
            className='w-full p-2 border border-gray-400'
            type='text'
            name='quote[{{ $locale }}]'
            id='quote_{{ $locale }}'
            value='of course'
          />

          <p className='mt-2 text-xs text-red-500'>shecdoma</p>
        </div>
        <div className='mb-6'>
          <label
            className='block mb-2 text-xs font-bold text-gray-700 uppercase'
            for='quote_{{ $locale }}'
          >
            Quote (KA)
          </label>
          <input
            className='w-full p-2 border border-gray-400'
            type='text'
            name='quote[{{ $locale }}]'
            id='quote_{{ $locale }}'
            value='of course'
          />

          <p className='mt-2 text-xs text-red-500'>shecdoma</p>
        </div>
        <div className='mt-2 mb-6'>
          <label for='category_id'>Movie </label>
          <select name='category_id' id='category_id'>
            <option value='2'> thor</option>
          </select>
        </div>
        <div className='flex mb-6'>
          <div className='p-2 border border-gray-500 rounded '>
            <label
              className='block mb-2 text-xs font-bold text-gray-700 uppercase '
              for='thumbnail'
            >
              Image
            </label>
            <input type='file' name='thumbnail' value='' id='thumbnail' />

            <p className='mt-2 text-xs text-red-500'>shecdoma</p>
          </div>
          <img
            src='img'
            width='64'
            height='64'
            className='ml-2'
            alt='quote img'
          />
        </div>
        <div className='mb-6 w-min'>
          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-green-600 rounded-lg rounderd hover:bg-green-700'
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Update;
