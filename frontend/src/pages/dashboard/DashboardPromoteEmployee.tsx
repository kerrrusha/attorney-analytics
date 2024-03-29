import {LoggedInProps, SelectOption, User, UserUpdateRequest} from "../../common/commonTypes";
import PageWithSidebar from "../../components/sidebar/PageWithSidebar";
import React, {useState} from "react";
import {doGetRequestReturnJson} from "../../services/doGetRequestReturnJson";
import {API_ENDPOINTS, PAGES} from "../../common/constants";
import InputDropdown from "../../components/InputDropdown";
import IdValuesSelect from "../../components/IdValuesSelect";
import {doPostRequestReturnResponse} from "../../services/doPostRequestReturnResponse";
import SubPageHeader from "../../components/SubPageHeader";
import useFetchTitles from "../../hooks/useFetchTitles";
import LoadingGif from "../../components/loading/LoadingGif";
import {mapToIdValues} from "../../common/commonUtils";
import {useTranslation} from "react-i18next";

export default function DashboardPromoteEmployee({loggedIn, setLoggedIn}: LoggedInProps) {
    const [selectedOptionValue, setSelectedOptionValue] = useState("");
    const [attorneyOptions, setAttorneyOptions]: [SelectOption[], any] = useState([]);
    const [titleId, setTitleId] = useState<number>(NaN);
    const { t } = useTranslation();

    const [titles] = useFetchTitles();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (inputValue: string) => {
        setAttorneyOptions([]);
        if (inputValue && inputValue.length > 0) {
            doGetRequestReturnJson(API_ENDPOINTS.searchUserByLastName + "/" + inputValue)
                .then(response => {
                    if (response && response.length > 0) {
                        const newAttorneyOptions = response.map((user: User) => { return {
                            value: "" + user.id,
                            label: user.firstName + " " + user.lastName + " (" + user.title + ")",
                        }});
                        setAttorneyOptions(newAttorneyOptions);
                    }
                });
        }
    };

    const handlePromote = () => {
        const requestBody : UserUpdateRequest = {
            userId: parseInt(selectedOptionValue),
            titleId: titleId,
        }

        doPostRequestReturnResponse(requestBody, API_ENDPOINTS.postUpdateUser).then(response => {
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
        <SubPageHeader header={t("dashboard.promote.name")} />
        {!titles ? <LoadingGif /> : <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="mt-4 flex flex-col col-span-4">
                <span className="mb-2">{t("dashboard.promote.label")}</span>
                <div className="flex flex-row space-x-4">
                    <InputDropdown options={attorneyOptions} handleChange={handleChange} handleSelect={setSelectedOptionValue} />
                    <IdValuesSelect name={t("profile.titleLow")} options={mapToIdValues(titles)} handleSetId={setTitleId} />
                </div>
                <button
                    onClick={handlePromote}
                    disabled={!selectedOptionValue || selectedOptionValue.length === 0}
                    style={{width: "15rem"}}
                    className="mt-3 rounded-md bg-white px-5 py-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    {t("dashboard.promote.action")}
                </button>
            </div>
        </div>
        }
        <div className="mt-3">
            {success && <div className="alert alert-success" role="alert">
                <p>{t("dashboard.promote.success1")}</p>
                <span>{t("dashboard.promote.success2")}<a href={PAGES.employees}>{t("dashboard.promote.success3")}</a> {t("dashboard.promote.success4")}</span>
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
