import React from 'react';
import i18next from 'i18next';

function LanguageSwitcher() {
  return (
    <div>
      <div>
        <button
          className='w-10 h-10 text-white bg-gray-800 rounded-md hover:bg-gray-900'
          onClick={() => i18next.changeLanguage('en')}
        >
          en
        </button>
        <button
          className='w-10 h-10 ml-2 text-white bg-gray-800 rounded-md hover:bg-gray-900'
          onClick={() => i18next.changeLanguage('ka')}
        >
          ka
        </button>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
