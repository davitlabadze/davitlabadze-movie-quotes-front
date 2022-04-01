import React from 'react';
import Image from '404/image.gif';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Title from 'components/Title';
const PageNotFound = () => {
  Title('Page Not Found');
  const { t } = useTranslation();
  return (
    <div className='flex items-center justify-center w-screen h-screen bgcolor'>
      <div className='px-4 lg:py-12'>
        <div className='lg:gap-4 lg:flex'>
          <div className='flex flex-col items-center justify-center md:py-24 lg:py-32'>
            <h1 className='font-bold text-green-600 text-9xl'>404</h1>
            <p className='mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl'>
              <span className='text-red-500'>{t('Oops!')}</span>
              {t('Page not found')}
            </p>
            <p className='mb-8 text-center text-gray-500 md:text-lg'>
              {t("The page you're looking for doesn't exist")}.
            </p>
            <Link to='/'>
              <p className='px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100 rounded'>
                {t('Return to the home page')}
              </p>
            </Link>
          </div>
          <div className='mt-4'>
            <img src={Image} alt='img' className='object-cover w-full h-full' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
