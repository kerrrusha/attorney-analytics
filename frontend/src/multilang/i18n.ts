import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationEN from "../resources/locales/en/translation.json";
import translationUA from "../resources/locales/ua/translation.json";

const resources = {
    en: {
        translation: translationEN,
    },
    ua: {
        translation: translationUA,
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'ua',
        debug: false,
    });

export default i18n;
