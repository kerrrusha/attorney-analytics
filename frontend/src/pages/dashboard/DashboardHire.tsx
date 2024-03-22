import {HireEmployeeRequest, LoggedInProps} from "../../common/commonTypes";
import PageWithSidebar from "../../components/sidebar/PageWithSidebar";
import React, {FormEvent, useState} from "react";
import {API_ENDPOINTS, PAGES} from "../../common/constants";
import IdValuesSelect from "../../components/IdValuesSelect";
import {doPostRequestReturnResponse} from "../../services/doPostRequestReturnResponse";
import SubPageHeader from "../../components/SubPageHeader";
import useFetchTitles from "../../hooks/useFetchTitles";
import {mapToIdValues} from "../../common/commonUtils";
import LoadingGif from "../../components/loading/LoadingGif";
import {useTranslation} from "react-i18next";

export default function DashboardHire({loggedIn, setLoggedIn}: LoggedInProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [login, setLogin] = useState("");
    const [titleId, setTitleId] = useState<number>(0);
    const { t } = useTranslation();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [titles] = useFetchTitles();

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const requestBody : HireEmployeeRequest = {
            firstName: firstName,
            lastName: lastName,
            login: login,
            titleId: titleId,
        }

        doPostRequestReturnResponse(requestBody, API_ENDPOINTS.postHireEmployee).then(response => {
            if (response.status === 200) {
                setError("");
                setSuccess(true);
                return;
            }
            setSuccess(false);
            response.json().then(json => setError(`Something went wrong: ${json.message}`));
        });
    }

    const contentElement = <div>
        <SubPageHeader header={t("dashboard.hire.name")} />
        {!titles ? <LoadingGif /> : <form className="mt-0" onSubmit={handleFormSubmit}>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-2 mb-2">
                    <label htmlFor="first-name" className="block text-sm font-medium mb-2">
                        {t("auth.firstName")}
                    </label>
                    <input
                        required
                        minLength={3}
                        id="first-name"
                        type="text"
                        value={firstName}
                        onChange={({target}) => setFirstName(target.value)}
                        className="text-black block mr-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300
            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="col-span-2 mb-2">
                    <label htmlFor="last-name" className="block text-sm font-medium mb-2">
                        {t("auth.lastName")}
                    </label>
                    <input
                        id="last-name"
                        type="text"
                        value={lastName}
                        onChange={({target}) => setLastName(target.value)}
                        className="text-black block mr-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300
            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="col-span-4">
                    <label htmlFor="login" className="block text-sm font-medium mb-2">
                        {t("profile.login")}
                    </label>
                    <div className="mt-2 flex flex-row items-center">
                        <input
                            value={login}
                            onChange={({target}) => setLogin(target.value)}
                            id="login"
                            type="email"
                            autoComplete="email"
                            className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="col-span-4">
                    <span className="block mb-2 text-sm font-medium">{t("profile.title")}</span>
                    <IdValuesSelect name={t("profile.titleLow")} options={mapToIdValues(titles)} handleSetId={setTitleId} />
                </div>
            </div>
            <hr />
            <div className="flex flex-row items-center">
                <button
                    type="submit"
                    className="px-5 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                    {t("dashboard.hire.action")}
                </button>
            </div>
        </form>
        }
        <div className="mt-3">
            {success && <div className="alert alert-success" role="alert">
                <p>{t("dashboard.hire.success1")}</p>
                <span>{t("dashboard.hire.success2")}<a href={PAGES.employees}>{t("dashboard.hire.success3")}</a> {t("dashboard.hire.success4")}</span>
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
