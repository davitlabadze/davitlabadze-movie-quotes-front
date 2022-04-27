import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}.json',
    },
    detection: {
      order: [
        'cookie',
        'localStorage',
        'htmlTag',
        'sessionStorage',
        'navigator',
        'querystring',
        'path',
        'subdomain',
      ],
      caches: ['localStorage', 'cookie'],
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
