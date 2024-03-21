import {AddNewClientRequest, LoggedInProps} from "../../common/commonTypes";
import PageWithSidebar from "../../components/sidebar/PageWithSidebar";
import React, {FormEvent, useState} from "react";
import {API_ENDPOINTS, PAGES} from "../../common/constants";
import IndepententCrudTable from "../../components/crud/IndependentCrudTable";
import {doPostRequestReturnResponse} from "../../services/doPostRequestReturnResponse";
import SubPageHeader from "../../components/SubPageHeader";

export default function DashboardAddNewClient({loggedIn, setLoggedIn}: LoggedInProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emails, setEmails] = useState<string[]>([]);
    const [phones, setPhones] = useState<string[]>([]);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const requestBody : AddNewClientRequest = {
            firstName: firstName,
            lastName: lastName,
            emails: emails,
            phones: phones,
        }

        doPostRequestReturnResponse(requestBody, API_ENDPOINTS.postAddClient).then(response => {
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
        <SubPageHeader header={"Add new client"} />
        <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="mt-4 flex flex-col col-span-2">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6">
                        First name
                    </label>
                    <div className="mt-2 flex flex-row items-center">
                        <input
                            required
                            value={firstName}
                            onChange={({target}) => setFirstName(target.value)}
                            id="first-name"
                            type="text"
                            className="text-black block mr-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300
            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="mt-4 flex flex-col col-span-2">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6">
                        Last name
                    </label>
                    <div className="mt-2 flex flex-row items-center">
                        <input
                            required
                            value={lastName}
                            onChange={({target}) => setLastName(target.value)}
                            id="last-name"
                            type="text"
                            className="text-black block mr-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300
            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="col-span-3">
                    <span className="block text-sm font-medium leading-6 mb-2">Emails</span>
                    <IndepententCrudTable name="emails" handleChange_={newRows => setEmails(newRows)} />
                </div>

                <div className="col-span-3">
                    <span className="block text-sm font-medium leading-6 mb-2">Phones</span>
                    <IndepententCrudTable name="phones" handleChange_={newRows => setPhones(newRows)} />
                </div>
            </div>

            <hr />
            <div className="flex flex-row items-center">
                <button
                    type="submit"
                    className="px-5 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                    Add client
                </button>
            </div>
            <div className="mt-3">
                {success && <div className="alert alert-success" role="alert">
                    <p>Client was added successfully.</p>
                    <span>Refer to the <a href={PAGES.clients}>clients</a> page to see updated clients list.</span>
                </div>
                }
                {error && <div className="alert alert-danger" role="alert">
                    <span>{error}</span>
                </div>
                }
            </div>
        </form>
    </div>;

    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"dashboard"} contentElement={contentElement}/>;
}
