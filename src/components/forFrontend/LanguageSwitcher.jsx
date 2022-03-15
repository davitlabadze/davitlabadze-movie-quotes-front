import React from 'react';

function LanguageSwitcher() {
  const changeHandler = (e) => {
    localStorage.setItem('lang', e.target.value);
    window.location.reload();
  };

  const lang = localStorage.getItem('lang') || 'en';

  return (
    <div className='fixed px-12 space-y-3 py-80'>
      <div
        className={`w-12 h-12 px-3 py-3 mb-2 text-sm text-center  border-2 rounded-full cursor-pointer +
          ${lang === 'en' ? 'text-white' : 'bg-gray-50'}
        `}
      >
        <button onClick={changeHandler} value='en'>
          en
        </button>
      </div>

      <div
        className={`w-12 h-12 px-3 py-3 text-sm text-center  border-2 rounded-full cursor-pointer +
          ${lang === 'ka' ? 'text-white' : 'bg-gray-50'}
        `}
      >
        <button onClick={changeHandler} value='ka'>
          ka
        </button>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
