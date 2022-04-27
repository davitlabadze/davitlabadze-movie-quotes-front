import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import Recent from 'adminPanel/img/recent.svg';
import TableThead from 'components/adminPanelComponents/TableThead';

const DashboardTable = (props) => {
  const { t } = useTranslation();
  const { data } = props;

  return (
    <Fragment>
      <div className='flex py-3 mt-10 '>
        <img src={Recent} className='flex-shrink-0 w-6 h-6 mr-3' alt='recent' />
        {t('Recent Movies quotes')}
      </div>
      <table className='w-full text-center divide-y divide-gray-200 rounded-md drop-shadow-md'>
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
        <tbody className='flex flex-col items-center w-full overflow-x-hidden overflow-y-scroll h-96 '>
          {data.map((quote) => (
            <tr className='flex w-full bg-white' key={quote.id}>
              <td className='w-1/4 p-4 px-6 text-gray-900'>{quote.id}</td>
              <td className='w-1/4 p-4 px-6 text-gray-500'>
                {quote.movie.movie.en}
              </td>
              <td className='w-1/4 p-4 px-6 text-gray-500'>
                {quote.movie.movie.ka}
              </td>
              <td className='w-1/4 p-4 px-6 text-gray-500'>{quote.quote.en}</td>
              <td className='w-1/4 p-4 px-6 text-gray-500'>{quote.quote.ka}</td>
              <td className='w-1/4 p-4 px-6 text-gray-500'>
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
