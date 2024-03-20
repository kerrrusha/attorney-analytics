import {LoggedInProps, SelectOption, User, UserUpdateRequest} from "../../common/commonTypes";
import PageWithSidebar from "../../components/sidebar/PageWithSidebar";
import React, {useState} from "react";
import {doGetRequestApiJson} from "../../services/doGetRequestApiJson";
import {API_ENDPOINTS, PAGES} from "../../common/constants";
import InputDropdown from "../../components/InputDropdown";
import TitleSelect from "../../components/TitleSelect";
import {postUpdateUser} from "../../services/postUpdateUser";

export default function DashboardPromoteEmployee({loggedIn, setLoggedIn}: LoggedInProps) {
    const [selectedOptionValue, setSelectedOptionValue] = useState("");
    const [attorneyOptions, setAttorneyOptions]: [SelectOption[], any] = useState([]);
    const [titleId, setTitleId] = useState<number>(NaN);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (inputValue: string) => {
        setAttorneyOptions([]);
        if (inputValue && inputValue.length > 0) {
            doGetRequestApiJson(API_ENDPOINTS.searchByLastName + "/" + inputValue)
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

        postUpdateUser(requestBody).then(response => {
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
        <div className="border-b p-2 flex flex-row justify-between align-items-center">
            <h4 className="text-header font-semibold">Promote attorney</h4>
        </div>
        <div className="mt-4 flex flex-col">
            <span className="mb-2">Attorney's last name</span>
            <div className="flex flex-row space-x-4">
                <InputDropdown options={attorneyOptions} handleChange={handleChange} handleSelect={setSelectedOptionValue} />
                <TitleSelect handleSetTitleId={setTitleId} />
            </div>
            <button
                onClick={handlePromote}
                disabled={!selectedOptionValue || selectedOptionValue.length === 0}
                style={{width: "15rem"}}
                className="mt-3 rounded-md bg-white px-5 py-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                Promote
            </button>
        </div>
        <div className="mt-3">
            {success && <div className="alert alert-success" role="alert">
                <p>Employee promoted successfully.</p>
                <span>Refer to the <a href={PAGES.employees}>employees</a> page to see updated employee list.</span>
            </div>
            }
            {error && <div className="alert alert-danger" role="alert">
                <span>{error}</span>
            </div>
            }
        </div>
    </div>;

    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"dashboard"} contentElement={contentElement}/>;
}
