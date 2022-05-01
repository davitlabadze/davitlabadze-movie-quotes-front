import { useTranslation } from 'react-i18next';

const NoInfromationAvailable = () => {
  const { t } = useTranslation();
  return (
    // <div className='w-full'>
    //   <h1 className='text-5xl text-center text-black pt-72 dark:text-slate-600'>
    //     {t('No information available')}
    //   </h1>
    // </div>

    <tr className='flex items-center w-full text-center'>
      <td className='w-full px-40 py-40 text-3xl font-normal text-black dark:text-slate-600 '>
        {t('No information available')}
      </td>
    </tr>
  );
};

export default NoInfromationAvailable;
