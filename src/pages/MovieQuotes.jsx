import React, { Fragment, useCallback, useEffect, useState } from 'react';

import Header from 'components/frontendComponents/Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import Loading from 'components/frontendComponents/Loading';

function Card() {
  useTranslation();
  const [quotes, setQuotes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  const getMovieQuotes = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios
        .get(`get-quotes/${params.movieId}`)
        .then((res) => {
          setQuotes(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }, [params.movieId]);

  useEffect(() => {
    getMovieQuotes();
  }, [getMovieQuotes]);

  return (
    <Fragment>
      {!isLoading && quotes && (
        <div>
          <Header title={quotes.movie[i18n.language]} />
          {quotes.quotes.map((quote) => (
            <div className='flex justify-center mt-14' key={quote.id}>
              <div className='max-w-4xl shadow-lg'>
                <img
                  className='w-full rounded-t-lg '
                  src={`${process.env.REACT_APP_ENV_IMAGE}${quote.thumbnail}`}
                  alt='Sunset in the mountains'
                />
                <div className='px-6 py-4 bg-white rounded-b-lg'>
                  <div className='mb-2 text-xl font-bold text-center'>
                    {quote.quote[i18n.language]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {isLoading && <Loading />}
    </Fragment>
  );
}

export default Card;
