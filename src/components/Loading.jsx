import spiner from 'adminPanel/img/spiner.svg';
const Loading = () => {
  return (
    <div className='flex items-center justify-center pt-96'>
      <span className='visually-hidden'>
        <img
          className='w-8 h-8 mr-2 animate-spin '
          src={spiner}
          alt='loading'
        />
      </span>
    </div>
  );
};

export default Loading;
