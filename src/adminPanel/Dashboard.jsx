import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import DashboardTable from 'components/adminPanelComponents/DashboardTable';
import Title from 'components/Title';
import { useTranslation } from 'react-i18next';
import Loading from 'components/Loading';
import NoInfromationAvailable from 'components/NoInfromationAvailable';
import DashboardCard from 'components/adminPanelComponents/DashboardCard';
import { FilmIcon, BookOpenIcon } from '@heroicons/react/outline';
function Dashboard() {
  Title('AdminPanel | Dashboard');
  useTranslation();

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
            <DashboardCard
              color='bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-cyan-500/50 hover:from-indigo-500 hover:to-pink-500 hover:shadow-red-600/50'
              icon={<FilmIcon />}
              name='All Movies'
              path='/adminpanel/movies'
              data={data.moviesCount}
            />
            <DashboardCard
              color='bg-gradient-to-r from-green-500 to-teal-500 shadow-lg shadow-teal-500/50 hover:from-yellow-500 hover:to-red-500 hover:shadow-green-600/50'
              icon={<BookOpenIcon />}
              name='All Quotes'
              path='/adminpanel/quotes'
              data={data.quotesCount}
            />
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
