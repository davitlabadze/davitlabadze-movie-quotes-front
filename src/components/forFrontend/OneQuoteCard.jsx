import React from 'react';

function OneQuoteCard() {
  return (
    <div>
      <div>
        <div className='flex justify-center '>
          <div className='rounded-lg'>
            <div className='mt-12'>
              <img
                className='object-cover w-full h-full rounded-lg'
                src='https://www.looper.com/img/gallery/the-real-reason-for-hemsworths-endgame-anger/intro-1571158290.jpg'
                alt='logo'
              />
            </div>
            <h1 className='py-12 text-5xl text-center text-white'>Of Course</h1>
            <div className='py-2 text-center text-white'>
              <a href='#' className='font-sans text-5xl underline'>
                Thor
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneQuoteCard;
