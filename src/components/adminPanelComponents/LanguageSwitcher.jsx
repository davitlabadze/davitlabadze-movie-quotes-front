import React, { useState } from 'react';
import i18next from 'i18next';
import { ChevronDownIcon } from '@heroicons/react/outline';

function LanguageSwitcher() {
  console.log(i18next.changeLanguage);
  const [isOpen, toggleOpen] = useState(false);
  const toggle = () => {
    toggleOpen(!isOpen);
  };
  return (
    <div>
      <button
        className='relative flex border-red-800 rounded-md'
        onClick={toggle}
      >
        {i18next.language === 'en' ? 'English' : 'ქართული'}

        <div className='w-3 h-3 mt-2 ml-2 border-red-800'>
          <ChevronDownIcon />
        </div>
      </button>
      {isOpen ? (
        <ul className='absolute z-10 w-40 p-2 py-3 mt-2 font-semibold text-left bg-white -ml-14 shadow-dialog rounded-xl'>
          {i18next.language === 'en' ? (
            <li
              className='block text-center transition duration-150 ease-in hover:bg-gray-100'
              onClick={() => toggleOpen(false)}
            >
              <span
                onClick={() => i18next.changeLanguage('ka')}
                className='cursor-pointer '
              >
                ქართული
              </span>
            </li>
          ) : (
            <li
              className='block text-center transition duration-150 ease-in hover:bg-gray-100'
              onClick={() => toggleOpen(false)}
            >
              <span
                onClick={() => i18next.changeLanguage('en')}
                className='cursor-pointer '
              >
                English
              </span>
            </li>
          )}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
}

export default LanguageSwitcher;
