import spiner from 'components/img/spiner.svg';
const Loading = () => {
  return (
    <tr className='flex items-center justify-center pt-44'>
      <td className='visually-hidden'>
        <img
          className='w-8 h-8 mr-2 animate-spin '
          src={spiner}
          alt='loading'
        />
      </td>
    </tr>
  );
};

export default Loading;
