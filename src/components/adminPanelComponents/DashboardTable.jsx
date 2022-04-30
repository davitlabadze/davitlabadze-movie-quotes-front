import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import TableThead from 'components/adminPanelComponents/TableThead';
import { ClipboardListIcon } from '@heroicons/react/outline';

const DashboardTable = (props) => {
  const { t } = useTranslation();
  const { data } = props;

  return (
    <Fragment>
      <div className='flex py-3 mt-10'>
        <ClipboardListIcon className='flex-shrink-0 w-6 h-6 mr-3 dark:text-slate-600' />
        <p className='dark:text-slate-600'>{t('Recent Movies quotes')}</p>
      </div>
      <table className='w-full text-center divide-y divide-gray-200 rounded-lg shadow-md dark:divide-slate-700 '>
        <TableThead
          title={[
            `${t('id')}`,
            `${t('Movie_en')}`,
            `${t('Movie_ka')}`,
            `${t('Quote_en')}`,
            `${t('Quote_ka')}`,
            `${t('image')}`,
          ]}
        />
        <tbody className='flex flex-col items-center w-full overflow-x-hidden overflow-y-scroll bg-white rounded-b-lg dark:bg-slate-800 h-96 '>
          {data.map((quote) => (
            <tr
              className='flex w-full bg-white dark:bg-slate-800'
              key={quote.id}
            >
              <td className='w-1/4 p-4 px-6 text-gray-900 dark:text-slate-600'>
                {quote.id}
              </td>
              <td className='w-1/4 p-4 px-6 text-gray-500 dark:text-slate-600'>
                {quote.movie.movie.en}
              </td>
              <td className='w-1/4 p-4 px-6 text-gray-500 dark:text-slate-600'>
                {quote.movie.movie.ka}
              </td>
              <td className='w-1/4 p-4 px-6 text-gray-500 dark:text-slate-600'>
                {quote.quote.en}
              </td>
              <td className='w-1/4 p-4 px-6 text-gray-500 dark:text-slate-600'>
                {quote.quote.ka}
              </td>
              <td className='w-1/4 p-4 px-6 text-gray-500 dark:text-slate-600'>
                <img
                  className='ml-20'
                  key={quote.id}
                  src={`${process.env.REACT_APP_ENV_IMAGE}${quote.thumbnail}`}
                  width='64'
                  height='64'
                  alt='movie img'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default DashboardTable;
