import { useTranslation } from "react-i18next";
import {Switch} from "@headlessui/react";
import {useState} from "react";

export default function LanguageSwitch() {
    const uaValue = "ua";
    const enValue = "en";

    const { i18n } = useTranslation();
    const [checked, setChecked] = useState(i18n.language === enValue);

    const handleLanguageChange = () => {
        const curLang = i18n.language;
        const nextLang = curLang === uaValue ? enValue : uaValue;
        setChecked(nextLang === enValue);
        i18n.changeLanguage(nextLang);
    };

    return (
        <div className="p-2 px-3 relative space-x-2 background-primary flex justify-center items-center rounded-lg">
            <img width="24" height="24" src="https://img.icons8.com/color/48/ukraine.png" alt="ukraine"/>

            <Switch
                checked={checked}
                onChange={handleLanguageChange}
                className={`${
                    checked ? "bg-[#635fc7]" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full`} >
                    <span className={`${
                        checked ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`} />
            </Switch>

            <img width="24" height="24" src="https://img.icons8.com/color/48/usa.png" alt="usa"/>
        </div>
    );
};
