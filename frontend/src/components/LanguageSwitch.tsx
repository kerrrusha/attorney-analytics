import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const handleLanguageChange = (e: { target: { value: any; }; }) => {
        const newLang = e.target.value;
        i18n.changeLanguage(newLang);
    };

    return (<select value={i18n.language} onChange={handleLanguageChange}
                    className="m-0 text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                focus:border-blue-500 block dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="ua">Українська</option>
            <option value="en">English</option>
        </select>);
};
