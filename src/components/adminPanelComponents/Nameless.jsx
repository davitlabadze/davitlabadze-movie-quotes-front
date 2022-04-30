import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Nameless = (props) => {
  const { t } = useTranslation();
  const { icon, btnIcon, title, path, action } = props;

  return (
    <div className='flex p-2 mb-10 '>
      <p className='flex p-2 dark:text-slate-600'>
        <div className='flex-shrink-0 w-6 h-6 mr-3 dark:text-slate-600'>
          {icon}
        </div>
        {t(title)}
      </p>
      <button className='flex p-2 text-white bg-gray-500 dark:text-slate-900 dark:bg-slate-700 dark:hover:bg-blue-500 hover:bg-gray-600 rounded-xl'>
        <div className='w-6 h-6'>{btnIcon}</div>
        <Link to={path}>{t(action)}</Link>
      </button>
    </div>
  );
};

export default Nameless;
