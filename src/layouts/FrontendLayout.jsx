import React from 'react';
import LanguageSwitcher from 'components/frontendComponents/LanguageSwitcher';
import LoginForAdmin from 'components/frontendComponents/LoginForAdmin';
import { Outlet } from 'react-router-dom';

function FrontendLayout() {
  return (
    <div className='bgcolor'>
      <LanguageSwitcher />
      <div className='min-h-screen'>
        <Outlet />
      </div>
      <LoginForAdmin />
    </div>
  );
}

export default FrontendLayout;
