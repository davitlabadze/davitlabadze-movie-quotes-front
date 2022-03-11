import React from 'react';

function BackButton() {
  return (
    <div className='absolute px-12 py-12'>
      <div className='absolute px-3 py-2 text-xl text-center text-white bg-transparent border-2 rounded-full cursor-pointer w-14s h-14s opacity-30 hover:opacity-100'>
        <a href='#'>Back</a>
      </div>
    </div>
  );
}

export default BackButton;
