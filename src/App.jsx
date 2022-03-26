import React from 'react';
import './App.css';
import FrontendLayout from './layouts/FrontendLayout';
import AdminPanel from './layouts/AdminPanel';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './adminPanel/Dashboard';
import Movies from './adminPanel/movie/Index';
import Quote from './adminPanel/quote/Index';
import Create from './adminPanel/movie/Create';
import Update from './adminPanel/movie/Update';
import CreateQuote from './adminPanel/quote/Create';
import UpdateQuote from './adminPanel/quote/Update';
import PageNotFound from './404/PageNotFound';
import OneQuoteCard from './components/forFrontend/OneQuoteCard';
import AllQuotesCard from './components/forFrontend/AllQuotesCard';
import Login from './auth/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<FrontendLayout />}>
          <Route path='/' element={<OneQuoteCard />} />
          <Route path='movie-quotes/:movieId/*' element={<AllQuotesCard />} />
          <Route path='login' element={<Login />} />
        </Route>
        {localStorage.getItem('token') ? (
          <Route path='/adminpanel/' element={<AdminPanel />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='movies' element={<Movies />}></Route>
            <Route path='movies/create-data' element={<Create />} />
            <Route path='movies/:movieId/edit' element={<Update />} />
            <Route path='quotes' element={<Quote />}></Route>
            <Route path='quotes/create-quote' element={<CreateQuote />} />
            <Route path='quotes/:quoteId/edit' element={<UpdateQuote />} />
          </Route>
        ) : (
          <Route path='*' element={<PageNotFound />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
