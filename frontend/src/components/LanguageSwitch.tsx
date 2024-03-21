import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const handleLanguageChange = (e: { target: { value: any; }; }) => {
        const newLang = e.target.value;
        i18n.changeLanguage(newLang);
    };

    return (<select value={i18n.language} onChange={handleLanguageChange}>
            <option value="ua">Українська</option>
            <option value="en">English</option>
        </select>);
};
