import {FireEmployeeRequest, LoggedInProps, SelectOption, User} from "../../common/commonTypes";
import PageWithSidebar from "../../components/sidebar/PageWithSidebar";
import InputDropdown from "../../components/InputDropdown";
import React, {useState} from "react";
import {doGetRequestReturnJson} from "../../services/doGetRequestReturnJson";
import {API_ENDPOINTS, PAGES} from "../../common/constants";
import {doPostRequestReturnResponse} from "../../services/doPostRequestReturnResponse";
import SubPageHeader from "../../components/SubPageHeader";
import {useAppSelector} from "../../hooks/useAppSelector";
import {selectUser} from "../../redux/slices/authSlice";
import {useTranslation} from "react-i18next";

export default function DashboardFire({loggedIn, setLoggedIn}: LoggedInProps) {
    const [selectedOptionValue, setSelectedOptionValue] = useState("");
    const [attorneyOptions, setAttorneyOptions]: [SelectOption[], any] = useState([]);
    const { t } = useTranslation();

    const user = useAppSelector(selectUser)!;

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (inputValue: string) => {
        setAttorneyOptions([]);
        if (inputValue && inputValue.length > 0) {
            doGetRequestReturnJson(API_ENDPOINTS.searchUserByLastName + "/" + inputValue)
                .then(response => {
                    if (response && response.length > 0) {
                        const newAttorneyOptions = response
                            .filter((u: User) => u.id !== user.id)
                            .map((user: User) => { return {
                            value: "" + user.id,
                            label: user.firstName + " " + user.lastName + " (" + user.title + ")",
                        }});
                        setAttorneyOptions(newAttorneyOptions);
                    }
                });
        }
    };

    const handleFire = () => {
        const requestBody : FireEmployeeRequest = {
            id: parseInt(selectedOptionValue),
        }

        doPostRequestReturnResponse(requestBody, API_ENDPOINTS.postFireEmployee).then(response => {
            if (response.status === 200) {
                setError("");
                setSuccess(true);
                return;
            }
            setSuccess(false);
            response.json().then(json => setError(`Something went wrong: ${json.message}`));
        });
    };

    const contentElement = <div>
        <SubPageHeader header={t("dashboard.fire.name")} />
        <div className="mt-4 flex flex-col">
            <span className="mb-2">{t("dashboard.fire.label")}</span>
            <div className="flex flex-row space-x-4">
                <InputDropdown options={attorneyOptions} handleChange={handleChange} handleSelect={setSelectedOptionValue} />
                <button
                    onClick={handleFire}
                    disabled={!selectedOptionValue || selectedOptionValue.length === 0}
                    className="rounded-md bg-white px-5 py-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    {t("dashboard.fire.action")}
                </button>
            </div>
        </div>
        <div className="mt-3">
            {success && <div className="alert alert-success" role="alert">
                <p>{t("dashboard.fire.success1")}</p>
                <span>{t("dashboard.fire.success2")}<a href={PAGES.employees}>{t("dashboard.fire.success3")}</a> {t("dashboard.fire.success4")}</span>
            </div>
            }
            {error && <div className="alert alert-danger" role="alert">
                <span>{error}</span>
            </div>
            }
        </div>
    </div>;

    return (<PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={t("dashboard.name")} contentElement={contentElement}/>);
}
