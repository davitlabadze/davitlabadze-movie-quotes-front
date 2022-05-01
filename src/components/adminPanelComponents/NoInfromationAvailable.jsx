import { useTranslation } from 'react-i18next';

const NoInfromationAvailable = () => {
  const { t } = useTranslation();
  return (
    <tr className='flex items-center w-full text-center'>
      <td className='w-full px-40 py-40 text-3xl font-normal text-black dark:text-slate-600 '>
        {t('No information available')}
      </td>
    </tr>
  );
};

export default NoInfromationAvailable;
