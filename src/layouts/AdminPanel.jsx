import React from 'react';

import Home from '../img/home.svg';
import Global from '../img/global.svg';
import Movies from '../img/movies.svg';
import Quotes from '../img/quotes.svg';
import Logout from '../img/logout.svg';
import Dashboard from '../adminPanel/Dashboard';
import Movie from '../adminPanel/movie/Index';
import Quote from '../adminPanel/quote/Index';
import Create from '../adminPanel/movie/Create';
import Update from '../adminPanel/movie/Update';
import CreateQuote from '../adminPanel/quote/Create';
import UpdateQuote from '../adminPanel/quote/Update';
import { Link, Route, Routes } from 'react-router-dom';

function AdminPanel() {
  return (
    <div>
      <div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0'>
        <div className='flex flex-col flex-1 min-h-0 bg-gray-800'>
          <div className='flex items-center flex-shrink-0 h-16 px-4 bg-gray-900'>
            <h1 className='text-xl font-bold text-white'>Adminpanel</h1>
          </div>
          <div className='flex flex-col flex-1 overflow-y-auto'>
            <nav className='flex-1 px-2 py-4 space-y-1'>
              <div className='flex items-center px-2 py-2 text-sm font-medium text-gray-500'>
                CORE
              </div>
              <Link
                to='dashboard'
                className='flex items-center px-2 py-2 text-sm font-medium text-white bg-gray-900 rounded-md group'
              >
                <img
                  src={Home}
                  className='flex-shrink-0 w-6 h-6 mr-3'
                  alt='home'
                />
                Dashboard
              </Link>
              <a
                href='home'
                className='flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white group'
                target='_blank'
              >
                <img
                  src={Global}
                  className='flex-shrink-0 w-6 h-6 mr-3'
                  alt='global'
                />
                View Website
              </a>
              <div className='flex items-center px-2 py-2 text-sm font-medium text-gray-500'>
                INTERFACE
              </div>
              <Link
                to='movies'
                className='flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white group'
              >
                <img
                  src={Movies}
                  className='flex-shrink-0 w-6 h-6 mr-3'
                  alt='movies'
                />
                Movies
              </Link>

              <Link
                to='quotes'
                className='flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white group'
              >
                <img
                  src={Quotes}
                  className='flex-shrink-0 w-6 h-6 mr-3'
                  alt='quotes'
                />
                Quotes
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className='flex flex-col md:pl-64'>
        <div className='sticky top-0 z-10 flex flex-shrink-0 h-16 bg-white shadow'>
          <div className='flex justify-between flex-1 px-4'>
            <div className='flex flex-1 mt-4'>Dashboard</div>
            <div className='flex items-center ml-4 md:ml-6'>
              <div className='relative ml-3'>
                <div>
                  <a
                    href='logout'
                    className='flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white group'
                  >
                    <img
                      src={Logout}
                      className='flex-shrink-0 w-6 h-6 text-gray-500'
                      alt='logout'
                    />
                    Log Out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className='w-full p-16 mx-auto mt-2 bg-gray-100 border border-gray-200 rounded-xl'>
          <div className='w-full'>
            <Routes>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='movies' element={<Movie />}></Route>
              <Route path='movies/create-data' element={<Create />} />
              <Route path='movies/:movieId/edit' element={<Update />} />
              <Route path='quotes' element={<Quote />}></Route>
              <Route path='quotes/create-quote' element={<CreateQuote />} />
              <Route path='quotes/:quoteId/edit' element={<UpdateQuote />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminPanel;
