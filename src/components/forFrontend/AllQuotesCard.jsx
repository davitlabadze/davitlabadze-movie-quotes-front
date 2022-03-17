import React, { Fragment, useEffect, useState } from 'react';

import Header from './Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Card() {
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
  const lang = localStorage.getItem('lang') || 'en';

  return (
    <Fragment>
      {!isLoading && quotes && (
        <div>
          <Header title={quotes.movie[lang]} />
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
                {quotes.quotes[0].quote[lang]}
              </h1>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <h1 className='text-5xl text-center text-white py-96'>Loading...</h1>
      )}
    </Fragment>
  );
}

export default Card;
