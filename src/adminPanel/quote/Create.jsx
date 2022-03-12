import React from 'react';

import Table from '../../img/table.svg';
import Eye from '../../img/eye.svg';

function Create() {
  return (
    <div>
      <div className='flex p-2 mb-10 -mt-12'>
        <p className='flex p-2'>
          <img className='flex-shrink-0 w-6 h-6 mr-3' src={Table} alt='table' />
          Add Quote
        </p>
        <button className='flex p-2 text-white bg-gray-500 hover:bg-gray-600 rounded-xl'>
          <img className='w-6 h-6' src={Eye} alt='eye' />
          <a href='quotes.index'>All Data</a>
        </button>
      </div>
      <form
        action='quotes.index'
        method='POST'
        className='mt-10'
        enctype='multipart/form-data'
      >
        <div className='mb-6'>
          <label
            className='block mb-2 text-xs font-bold text-gray-700 uppercase'
            for='quote_{{ $locale }}'
          >
            Quotes (EN)
          </label>
          <input
            className='w-full p-2 border border-gray-400'
            type='text'
            name='quote[{{ $locale }}]'
            id='quote_{{ $locale }}'
            value='of course'
          />
          {/* error message */}
          <p className='mt-2 text-xs text-red-500'>shecdoma</p>
        </div>

        <div className='mb-6'>
          <label
            className='block mb-2 text-xs font-bold text-gray-700 uppercase'
            for='quote_{{ $locale }}'
          >
            Quotes (EN)
          </label>
          <input
            className='w-full p-2 border border-gray-400'
            type='text'
            name='quote[{{ $locale }}]'
            id='quote_{{ $locale }}'
            value='რათქმაუნდა'
          />
          {/* error message */}
          <p className='mt-2 text-xs text-red-500'>shecdoma</p>
        </div>

        <div className='mb-6'>
          <select name='category_id'>
            <option value='id'> thor</option>
          </select>
        </div>
        <div className='mb-6'>
          <label
            className='block mb-2 text-xs font-bold text-gray-700 uppercase'
            for='text'
          >
            Image
          </label>
          <input type='file' name='thumbnail' id='thumbnail' />
          {/* error message */}
          <p className='mt-2 text-xs text-red-500'>shecdoma</p>
        </div>
        <div className='mb-6 w-min'>
          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-green-600 rounded-lg rounderd hover:bg-green-700'
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
