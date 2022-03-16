import React from 'react';

const Movietitle = (props) => {
  return (
    <div className='flex px-12 py-12 mb-20 text-5xl text-white ml-96 '>
      {props.title}
    </div>
  );
};

export default Movietitle;
