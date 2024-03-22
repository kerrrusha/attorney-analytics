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

export const LANGUAGE_UA = "ua";
export const LANGUAGE_EN = "en";

export const LANGUAGE_KEY = "language";
export const DEFAULT_LANGUAGE = localStorage.getItem(LANGUAGE_KEY) || LANGUAGE_UA;

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: DEFAULT_LANGUAGE,
        fallbackLng: 'ua',
        debug: false,
    });

export default i18n;
