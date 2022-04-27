import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import DashboardTable from 'components/adminPanelComponents/DashboardTable';
import Movies from 'adminPanel/img/movies.svg';
import Quotes from 'adminPanel/img/quotes.svg';
import { Link } from 'react-router-dom';
import Title from 'components/Title';
import { useTranslation } from 'react-i18next';
import Loading from 'components/Loading';
import NoInfromationAvailable from 'components/NoInfromationAvailable';

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
      {!isLoading && data.quotes.length === 0 && <NoInfromationAvailable />}
      {isLoading && <Loading />}
    </Fragment>
  );
}

export default Dashboard;
