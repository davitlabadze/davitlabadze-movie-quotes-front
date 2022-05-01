import { useTranslation } from 'react-i18next';

const NoInfromationAvailable = () => {
  const { t } = useTranslation();
  return (
    <div className='w-full'>
      <h1 className='text-5xl text-center text-black pt-72 dark:text-slate-600'>
        {t('No information available')}
      </h1>
    </div>
  );
};

export default NoInfromationAvailable;
