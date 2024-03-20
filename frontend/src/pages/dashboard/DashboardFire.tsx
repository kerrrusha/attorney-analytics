import {LoggedInProps, SelectOption, User} from "../../common/commonTypes";
import PageWithSidebar from "../../components/sidebar/PageWithSidebar";
import InputDropdown from "../../components/InputDropdown";
import {useState} from "react";
import {doGetRequestApiJson} from "../../services/doGetRequestApiJson";
import {API_ENDPOINTS} from "../../common/constants";

export default function DashboardFire({loggedIn, setLoggedIn}: LoggedInProps) {
    const [selectedOptionValue, setSelectedOptionValue] = useState("");

    const [attorneyOptions, setAttorneyOptions]: [SelectOption[], any] = useState([]);

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

    const contentElement = <div>
        <div className="border-b p-2 flex flex-row justify-between align-items-center">
            <h4 className="text-header font-semibold">Fire attorney</h4>
        </div>
        <div className="mt-4 flex flex-col">
            <span className="mb-2">Attorney's last name</span>
            <div className="flex flex-row space-x-4">
                <InputDropdown options={attorneyOptions} handleChange={handleChange} handleSelect={setSelectedOptionValue} />
                <button
                    disabled={!selectedOptionValue || selectedOptionValue.length === 0}
                    className="rounded-md bg-white px-5 py-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    Fire
                </button>
            </div>
        </div>
    </div>;

    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"dashboard"} contentElement={contentElement}/>;
}
