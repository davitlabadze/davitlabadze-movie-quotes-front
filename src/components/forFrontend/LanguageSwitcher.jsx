import React from 'react';

function LanguageSwitcher() {
  return (
    <div className='fixed px-12 space-y-3 py-80'>
      <div className='w-12 h-12 px-3 py-3 mb-2 text-sm text-center text-white bg-transparent border-2 rounded-full cursor-pointer'>
        <a href='#'>en</a>
      </div>
      <div className='w-12 h-12 px-3 py-3 text-sm text-center bg-white border-2 rounded-full cursor-pointer'>
        <a href='#'>ka</a>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
