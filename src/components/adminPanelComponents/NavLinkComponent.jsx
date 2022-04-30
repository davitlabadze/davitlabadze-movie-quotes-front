import useDarkMode from 'hooks/useDarkMode';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
const NavLinkComponent = (props) => {
  useDarkMode();
  const { t } = useTranslation();
  const { path, icon, title } = props;

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? 'flex items-center px-2 py-2 text-sm font-medium  text-red-500 shadow-lg shadow-gray-500/40 bg-gray-100 rounded-md group '
          : 'flex items-center px-2 py-2 text-sm font-medium text-gray-200 rounded-md hover:shadow-lg shadow-indigo-500/40  hover:text-black group'
      }
    >
      <div className='flex-shrink-0 w-6 h-6 mr-3'>{icon}</div>
      {t(title)}
    </NavLink>
  );
};

export default NavLinkComponent;
