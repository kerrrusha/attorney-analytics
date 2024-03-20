import { LoggedInProps, SelectOption} from "../../common/commonTypes";
import PageWithSidebar from "../../components/sidebar/PageWithSidebar";
import InputDropdown from "../../components/InputDropdown";
import {useState} from "react";

export default function DashboardFire({loggedIn, setLoggedIn}: LoggedInProps) {
    const [selectedOptionValue, setSelectedOptionValue] = useState("");

    const init = [
        { value: '1', label: 'Kirill Koval' },
        { value: '2', label: 'Saul Goodman' },
        { value: '3', label: 'James Hetfield' },
    ];

    const [attorneyOptions, setAttorneyOptions]: [SelectOption[], any] = useState(init);

    const handleChange = (inputValue: string) => {
        console.log(inputValue);
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
