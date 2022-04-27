import React from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  useTranslation();
  return (
    <div className='fixed px-12 space-y-3 py-80'>
      <div
        className={`w-12 h-12 px-3 py-3 mb-2 text-sm text-center  border-2 rounded-full cursor-pointer +
          ${i18next.language === 'en' ? 'text-white' : 'bg-gray-50'}
        `}
      >
        <button onClick={() => i18next.changeLanguage('en')}>en</button>
      </div>

      <div
        className={`w-12 h-12 px-3 py-3 text-sm text-center  border-2 rounded-full cursor-pointer +
          ${i18next.language === 'ka' ? 'text-white' : 'bg-gray-50'}
        `}
      >
        <button onClick={() => i18next.changeLanguage('ka')}>ka</button>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
