import React from 'react';
import LanguageSwitcher from '../components/forFrontend/LanguageSwitcher';
import LoginForAdmin from '../components/forFrontend/LoginForAdmin';
import AllQuotesCard from '../components/forFrontend/AllQuotesCard';
import OneQuoteCard from '../components/forFrontend/OneQuoteCard';
import Login from '../auth/Login';
import { Routes, Route } from 'react-router-dom';

function FrontendLayout() {
  return (
    <div className='bgcolor'>
      <LanguageSwitcher />
      <div className='min-h-screen'>
        <Routes>
          <Route path='/' element={<OneQuoteCard />} />
          <Route path='/movie-quotes/:movieId' element={<AllQuotesCard />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>

      <LoginForAdmin />
    </div>
  );
}

export default FrontendLayout;
