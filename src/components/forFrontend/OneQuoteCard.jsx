import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function OneQuoteCard() {
  const [quote, setQuote] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getRandomQuote();
  }, []);

  const getRandomQuote = () => {
    setIsLoading(true);
    axios
      .get('get-quote')
      .then((res) => {
        setQuote(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };
  const lang = localStorage.getItem('lang') || 'en';

  return (
    <Fragment>
      {!isLoading && quote && (
        <div className='flex justify-center py-32'>
          <div className='rounded-lg'>
            <div className='h-96'>
              <img
                className='object-cover w-full h-full rounded-lg'
                src={`http://localhost:8000/storage/${quote.thumbnail}`}
                alt='logo'
              />
            </div>
            <h1 className='py-12 text-5xl text-center text-white'>
              {quote.quote[lang]}
            </h1>
            <div className='py-2 text-center text-white'>
              <Link
                to={`/movie-quotes/${quote.movie_id}`}
                className='font-sans text-5xl underline'
              >
                {quote.movie.movie[lang]}
              </Link>
            </div>
          </div>
        </div>
      )}
      {!isLoading && !quote && (
        <h1 className='text-5xl text-center text-white py-96'>
          No posts have been added yet
        </h1>
      )}
      {isLoading && (
        <h1 className='text-5xl text-center text-white py-96'>Loading...</h1>
      )}
    </Fragment>
  );
}

export default OneQuoteCard;
