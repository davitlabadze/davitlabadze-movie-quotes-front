import React from 'react';
import Header from './Header';

function Card() {
  return (
    <div>
      <Header />
      <div className='bottom-0 px-96'>
        <div className='justify-center'>
          <div className='flex justify-center mt-14 '>
            <div className='bg-white rounded-lg '>
              <div className=' h-96'>
                <img
                  className='object-cover w-full h-full rounded'
                  src='https://www.looper.com/img/gallery/the-truth-behind-thors-i-knew-it-line-in-endgame/intro-1573157235.jpg'
                  alt='img'
                />
              </div>
              <h1 className='py-16 text-5xl text-center text-black'>i knew</h1>
            </div>
          </div>

          <div className='flex justify-center mt-14'>
            <div className='bg-white rounded-lg'>
              <div className=' h-96'>
                <img
                  className='object-cover w-full h-full rounded'
                  src='https://www.looper.com/img/gallery/the-real-reason-for-hemsworths-endgame-anger/intro-1571158290.jpg'
                  alt='img'
                />
              </div>
              <h1 className='py-16 text-5xl text-center text-black'>
                Of Course
              </h1>
            </div>
          </div>

          <div className='flex justify-center mt-14'>
            <div className='bg-white rounded-lg'>
              <div className=' h-96'>
                <img
                  className='object-cover w-full h-full rounded'
                  src='https://static3.srcdn.com/wordpress/wp-content/uploads/2020/11/Thor-Mjolnir.jpg'
                  alt='img'
                />
              </div>
              <h1 className='py-16 text-5xl text-center text-black'>
                I am still worthy
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
