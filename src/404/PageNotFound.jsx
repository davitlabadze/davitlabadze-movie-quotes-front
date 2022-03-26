import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className='w-full h-full ml-96 '>
      <div className='w-96 ml-96 h-96 mt-96'>
        <h1 className='text-xl text-center'>404</h1>
        <h1 className='text-center'>Page Not Found</h1>
        <Link to='/'>
          <p className='text-center underline hover:text-blue-400'>
            Return to the home page
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
