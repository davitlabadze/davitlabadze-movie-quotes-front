import React from 'react';

const FlashMessage = (props) => {
  const { flash } = props;
  return (
    <div>
      {flash ? (
        <h1
          className={`animate-pulse w-full px-4 py-2 ml-4 text-white bg-green-600 rounded-lg rounderd text-center + ${
            flash === 'successfully!' ? `bg-green-600` : `bg-red-600 `
          }`}
        >
          {flash}
        </h1>
      ) : (
        ''
      )}
    </div>
  );
};

export default FlashMessage;
