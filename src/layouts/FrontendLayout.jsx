import React from 'react';
import LanguageSwitcher from '../components/forFrontend/LanguageSwitcher';
import LoginForAdmin from '../components/forFrontend/LoginForAdmin';
import AllQuotesCard from '../components/forFrontend/AllQuotesCard';
import OneQuoteCard from '../components/forFrontend/OneQuoteCard';

function FrontendLayout() {
  return (
    <div className='bgcolor'>
      <LanguageSwitcher />
      <div className='min-h-screen'>
        <AllQuotesCard />
        {/* <OneQuoteCard /> */}
      </div>
      <LoginForAdmin />
    </div>
  );
}

export default FrontendLayout;
