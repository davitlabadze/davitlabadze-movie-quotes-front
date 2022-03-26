import React, { Fragment, useEffect, useState } from 'react';

import Header from './Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

function Card() {
  const { t } = useTranslation();
  const [quotes, setQuotes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    getMovieQuotes();
  }, []);

  const getMovieQuotes = () => {
    setIsLoading(true);
    axios
      .get(`get-quotes/${params.movieId}`)
      .then((res) => {
        setQuotes(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  return (
    <Fragment>
      {!isLoading && quotes && (
        <div>
          <Header title={quotes.movie[i18n.language]} />
          <div className='flex justify-center mt-14 '>
            <div className='bg-white rounded-lg '>
              <div className=' h-96'>
                <img
                  className='object-cover w-full h-full rounded'
                  src={`http://localhost:8000/storage/${quotes.quotes[0].thumbnail}`}
                  alt='img'
                />
              </div>
              <h1 className='py-16 text-5xl text-center text-black'>
                {quotes.quotes[0].quote[i18n.language]}
              </h1>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <h1 className='text-5xl text-center text-white py-96'>
          {t('Loading')}...
        </h1>
      )}
    </Fragment>
  );
}

export default Card;
