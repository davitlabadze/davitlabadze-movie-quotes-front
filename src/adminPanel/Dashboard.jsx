import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import DashboardTable from 'components/adminPanelComponents/DashboardTable';
import Movies from 'adminPanel/img/movies.svg';
import Quotes from 'adminPanel/img/quotes.svg';
import { Link } from 'react-router-dom';
import Title from 'components/Title';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  Title('AdminPanel | Dashboard');
  const { t } = useTranslation();

  const [data, setData] = useState({
    moviesCount: '',
    quotesCount: '',
    quotes: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    setIsLoading(true);
    try {
      await axios
        .get('dashboard')
        .then((res) => {
          setData((datas) => {
            return {
              ...datas,
              moviesCount: res.data.moviesCount,
              quotesCount: res.data.quotesCount,
              quotes: res.data.quotes,
            };
          });
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };
  return (
    <Fragment>
      {!isLoading && data.quotes.length > 0 && (
        <div>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-4'>
            <div className='relative flex items-center px-6 py-5 space-x-3 bg-red-500 border rounded-lg shadow-sm hover:bg-red-600'>
              <div className='flex-shrink-0'>
                <img
                  src={Movies}
                  className='flex-shrink-0 w-6 h-6 mr-3 text-white'
                  alt='movies'
                />
              </div>
              <div className='flex-1 min-w-0'>
                <Link to='/adminpanel/movies'>
                  <h3 className='focus:outline-none'>
                    <p className='text-sm font-medium text-white'>
                      {t('All Movies')}
                    </p>
                    <p className='text-sm text-white truncate'>
                      {t('total')}: {data.moviesCount}
                    </p>
                  </h3>
                </Link>
              </div>
            </div>
            <div className='relative flex items-center px-6 py-5 space-x-3 bg-blue-500 border rounded-lg shadow-sm hover:bg-blue-600'>
              <div className='flex-shrink-0'>
                <img
                  src={Quotes}
                  className='flex-shrink-0 w-6 h-6 mr-3'
                  alt='quotes'
                />
              </div>
              <div className='flex-1 min-w-0'>
                <Link to='/adminpanel/quotes'>
                  <h3 className='focus:outline-none'>
                    <p className='text-sm font-medium text-white'>
                      {t('All Quotes')}
                    </p>
                    <p className='text-sm text-white truncate'>
                      {t('total')}: {data.quotesCount}
                    </p>
                  </h3>
                </Link>
              </div>
            </div>
          </div>
          <DashboardTable data={data.quotes} />
        </div>
      )}
      {!isLoading && !data && (
        <h1 className='text-5xl text-center text-black py-96'>
          {t('No information available')}
        </h1>
      )}
      {isLoading && (
        <div className='flex items-center justify-center'>
          <span className='visually-hidden'>
            <svg
              role='status'
              className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
          </span>
        </div>
      )}
    </Fragment>
  );
}

export default Dashboard;

// {
//   /* <h1 className='text-5xl text-center text-black py-96'>
//         //     {t('Loading')}...
//       //   </h1> */
// }

// {/* <svg
//             role='status'
//             class='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
//             viewBox='0 0 100 101'
//             fill='none'
//             xmlns='http://www.w3.org/2000/svg'
//           >
//             <path
//               d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
//               fill='currentColor'
//             />
//             <path
//               d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
//               fill='currentFill'
//             />
//           </svg> */}
