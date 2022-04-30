import React from 'react';
import {
  TemplateIcon,
  GlobeAltIcon,
  FilmIcon,
  BookOpenIcon,
  LogoutIcon,
} from '@heroicons/react/outline';

import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from 'components/adminPanelComponents/LanguageSwitcher';
import useDarkMode from 'hooks/useDarkMode';
import NavLinkComponent from 'components/adminPanelComponents/NavLinkComponent';

function AdminPanel() {
  useDarkMode();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logoutSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post('logout')
        .then((res) => {
          if (res.data.status === 200) {
            localStorage.removeItem('token');
            navigate('/', { replace: true });
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className='h-screen bg-gray-200'>
      <div className=' bg-gradient-to-b from-gray-500 to-white shadow-right md:flex md:w-64 md:flex-col md:fixed md:inset-y-0'>
        <div className='flex flex-col flex-1 min-h-0'>
          <div className='flex items-center h-16 px-4 bg-gray-800 shadow-sm '>
            <h1 className='text-xl font-bold text-white'>{t('Adminpanel')}</h1>
          </div>
          <div className='flex flex-col flex-1 overflow-hidden'>
            <nav className='flex-1 px-2 py-4 space-y-1'>
              <div className='flex items-center px-2 py-2 text-sm font-medium text-gray-900'>
                {t('CORE')}
              </div>

              <NavLinkComponent
                path='/adminpanel/dashboard'
                icon={<TemplateIcon />}
                title='Dashboard'
              />
              <Link
                to='/'
                className='flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:shadow-lg shadow-gray-500/50 hover:text-black '
                target='_blank'
              >
                <GlobeAltIcon className='flex-shrink-0 w-6 h-6 mr-3' />
                {t('View Website')}
              </Link>
              <div className='flex items-center px-2 py-2 text-sm font-medium text-gray-900'>
                {t('INTERFACE')}
              </div>
              <NavLinkComponent
                path='/adminpanel/movies'
                icon={<FilmIcon />}
                title='Movies'
              />
              <NavLinkComponent
                path='/adminpanel/quotes'
                icon={<BookOpenIcon />}
                title='Quotes'
              />
            </nav>
          </div>
        </div>
      </div>
      <div className='flex flex-col md:pl-64 '>
        <div className='flex flex-shrink-0 h-16'>
          <div className='flex justify-between flex-1 px-16 bg-white shadow'>
            <div className='flex flex-1 mt-4 font-bold text-black '>
              {t('Dashboard')}
            </div>
            <div className='flex items-center md:ml-6'>
              <LanguageSwitcher />
              <div className='relative ml-3'>
                <div>
                  <button
                    type='button'
                    className='flex items-center px-2 py-2 text-sm font-medium text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400 hover:text-white group'
                    onClick={logoutSubmit}
                  >
                    <LogoutIcon className='flex-shrink-0 w-6 h-6 text-gray-500' />
                    {t('Log Out')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className='w-full p-16 mx-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminPanel;
