import { useTranslation } from 'react-i18next';

const NoInfromationAvailable = () => {
  const { t } = useTranslation();
  return (
    <h1 className='text-5xl text-center text-black py-96'>
      {t('No information available')}
    </h1>
  );
};

export default NoInfromationAvailable;
