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

export default i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "ua",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });
