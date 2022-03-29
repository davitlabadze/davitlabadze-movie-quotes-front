import React from 'react';
import { useTranslation } from 'react-i18next';

const Button = (props) => {
  const { t } = useTranslation();
  const { title } = props;
  return (
    <button
      type='submit'
      className='w-full px-4 py-2 text-white bg-green-600 rounded-lg rounderd hover:bg-green-700'
    >
      {t(`${title}`)}
    </button>
  );
};

export default Button;
