import React, { useState } from 'react';
import i18next from 'i18next';
import { ChevronDownIcon } from '@heroicons/react/outline';
function LanguageSwitcher() {
  const [isOpen, toggleOpen] = useState(false);
  const toggle = () => {
    toggleOpen(!isOpen);
  };
  return (
    <div>
      <button
        className='relative flex border-red-800 rounded-md dark:text-white'
        onClick={toggle}
      >
        {i18next.language === 'en' ? 'English' : 'ქართული'}
        <div className='w-3 h-3 mt-2 ml-2 border-red-800'>
          <ChevronDownIcon />
        </div>
      </button>
      {isOpen ? (
        <ul className='absolute z-10 w-40 p-2 py-3 mt-2 font-semibold text-left bg-white shadow-lg -ml-14 rounded-xl dark:bg-slate-800'>
          {i18next.language === 'en' ? (
            <li
              className='block text-center transition duration-150 ease-in hover:bg-gray-100 dark:hover:bg-slate-700'
              onClick={() => toggleOpen(false)}
            >
              <span
                onClick={() => i18next.changeLanguage('ka')}
                className='cursor-pointer dark:text-white '
              >
                ქართული
              </span>
            </li>
          ) : (
            <li
              className='block text-center transition duration-150 ease-in hover:bg-gray-100 dark:hover:bg-slate-700'
              onClick={() => toggleOpen(false)}
            >
              <span
                onClick={() => i18next.changeLanguage('en')}
                className='cursor-pointer dark:text-white'
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
