import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import Loading from 'components/Loading';

function OneQuoteCard() {
  const { t } = useTranslation();
  const [quote, setQuote] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRandomQuote();
  }, []);

  const getRandomQuote = async () => {
    setIsLoading(true);
    try {
      await axios
        .get('get-quote')
        .then((res) => {
          if (res.data) {
            setQuote(res.data);
          } else {
          }
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      {!isLoading && quote && (
        <div className='flex justify-center py-32'>
          <div className='rounded-lg'>
            <div className='h-96'>
              <img
                className='object-cover w-full h-full rounded-lg'
                src={`${process.env.REACT_APP_ENV_IMAGE}${quote.thumbnail}`}
                alt='logo'
              />
            </div>
            <h1 className='py-12 text-5xl text-center text-white'>
              {quote.quote[i18n.language]}
            </h1>
            <div className='py-2 text-center text-white'>
              <Link
                to={`/movie-quotes/${quote.movie_id}`}
                className='font-sans text-5xl underline'
              >
                {quote.movie.movie[i18n.language]}
              </Link>
            </div>
          </div>
        </div>
      )}
      {!isLoading && !quote && (
        <h1 className='text-5xl text-center text-white py-96'>
          {t('No information available')}
        </h1>
      )}
      {isLoading && <Loading />}
    </Fragment>
  );
}

export default OneQuoteCard;
