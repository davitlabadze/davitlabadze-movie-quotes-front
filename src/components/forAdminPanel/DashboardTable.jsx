import React from 'react';
import { useTranslation } from 'react-i18next';
import Recent from '../../img/recent.svg';

const DashboardTable = (props) => {
  const { t } = useTranslation();

  const { data } = props;
  return (
    <div>
      <div className='flex py-3 mt-10 '>
        <img src={Recent} className='flex-shrink-0 w-6 h-6 mr-3' alt='recent' />
        {t('Recent Movies quotes')}
      </div>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th
              scope='col'
              className='px-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
            >
              Id
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
            >
              Movies_en
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
            >
              Movies_ka
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
            >
              Quotes_en
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
            >
              Quotes_ka
            </th>
            <th
              scope='col'
              className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
            >
              Image
            </th>
          </tr>
        </thead>
        <tbody>
          {data.quotes.map((quote) => (
            <tr className='bg-white' key={quote.id}>
              <td className='px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap'>
                {quote.id}
              </td>
              <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                {quote.movie.movie.en}
              </td>
              <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                {quote.movie.movie.ka}
              </td>
              <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                {quote.quote.en}
              </td>
              <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                {quote.quote.ka}
              </td>
              <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
                <img
                  src={`http://localhost:8000/storage/${quote.thumbnail}`}
                  alt='img'
                  width='64'
                  height='64'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
