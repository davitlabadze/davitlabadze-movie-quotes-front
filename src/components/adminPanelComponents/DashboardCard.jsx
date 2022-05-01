import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const DashboardCard = (props) => {
  const { t } = useTranslation();
  const { icon, path, name, data, color } = props;
  return (
    <div
      className={`relative flex items-center px-6 py-5 space-x-3 rounded-lg shadow-sm ${color}`}
    >
      <div className='flex-shrink-0'>
        <div className='flex-shrink-0 w-6 h-6 mr-3 text-white'>{icon}</div>
      </div>
      <div className='flex-1 min-w-0'>
        <Link to={path}>
          <h3 className='focus:outline-none'>
            <p className='text-sm font-medium text-white'>{t(name)}</p>
            <p className='text-sm text-white truncate'>
              {t('total')}: {data}
            </p>
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default DashboardCard;
