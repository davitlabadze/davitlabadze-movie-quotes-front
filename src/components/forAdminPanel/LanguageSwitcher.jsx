import React from 'react';
import i18next from 'i18next';

function LanguageSwitcher() {
  return (
    <div>
      <div>
        <button onClick={() => i18next.changeLanguage('en')}>en</button>
        <button onClick={() => i18next.changeLanguage('ka')}>ka</button>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
