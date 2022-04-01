import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DashboardTable from 'components/adminPanelComponents/DashboardTable';
import Movies from 'adminPanel/img/movies.svg';
import Quotes from 'adminPanel/img/quotes.svg';
import { Link } from 'react-router-dom';
import Title from 'components/Title';
function Dashboard() {
  Title('AdminPanel | Dashboard');
  const [data, setData] = useState({
    moviesCount: '',
    quotesCount: '',
    quotes: [],
  });

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
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
  };
  return (
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
                <p className='text-sm font-medium text-white'>All Movies</p>
                <p className='text-sm text-white truncate'>
                  total: {data.moviesCount}
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
                <p className='text-sm font-medium text-white'>All Quotes</p>
                <p className='text-sm text-white truncate'>
                  total: {data.quotesCount}
                </p>
              </h3>
            </Link>
          </div>
        </div>
      </div>

      <DashboardTable data={data.quotes} />
    </div>
  );
}

export default Dashboard;
