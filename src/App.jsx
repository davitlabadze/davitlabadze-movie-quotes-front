import React from 'react';
import 'App.css';
import FrontendLayout from 'layouts/FrontendLayout';
import { Routes, Route } from 'react-router-dom';
import AdminPanel from 'layouts/AdminPanel';
import Dashboard from 'adminPanel/Dashboard';
import Movies from 'adminPanel/movie/Index';
import Create from 'adminPanel/movie/Create';
import Update from 'adminPanel/movie/Update';
import Quote from 'adminPanel/quote/Index';
import CreateQuote from 'adminPanel/quote/Create';
import UpdateQuote from 'adminPanel/quote/Update';
import PageNotFound from '404/PageNotFound';

import SingleQuote from 'pages/SingleQuote';
import MovieQuotes from 'pages/MovieQuotes';
import Login from 'auth/Login';

import RequireAuth from 'components/frontendComponents/RequireAuth';

function App() {
  return (
    <div>
      <Routes>
        <Route element={<FrontendLayout />}>
          <Route path='/' element={<SingleQuote />} />
          <Route path='movie-quotes/:movieId' element={<MovieQuotes />} />
          <Route path='login' element={<Login />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path='/' element={<AdminPanel />}>
            <Route path='adminpanel/dashboard' element={<Dashboard />} />
            <Route path='/adminpanel/movies' element={<Movies />}></Route>
            <Route path='/adminpanel/movies/create-data' element={<Create />} />
            <Route
              path='/adminpanel/movies/:movieId/edit'
              element={<Update />}
            />
            <Route path='/adminpanel/quotes' element={<Quote />}></Route>
            <Route
              path='/adminpanel/quotes/create-quote'
              element={<CreateQuote />}
            />
            <Route
              path='/adminpanel/quotes/:quoteId/edit'
              element={<UpdateQuote />}
            />
          </Route>
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
