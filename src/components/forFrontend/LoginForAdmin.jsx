import React from 'react';
import { Link } from 'react-router-dom';

function LoginForAdmin() {
  return (
    <div>
      <div className='fixed ml-10 text-sm text-gray-600 underline opacity-50 bottom-16 hover:text-gray-300'>
        {localStorage.getItem('token') ? (
          <Link to='/adminpanel/dashboard' className='font-sans'>
            Go to Adminpanel
          </Link>
        ) : (
          <Link to='/login' className='font-sans'>
            Authorization for the administrator
          </Link>
        )}
      </div>
    </div>
  );
}

export default LoginForAdmin;
