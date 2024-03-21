import {DeclarePaymentRequest, LegalCaseDto, LoggedInProps, SelectOption} from "../../common/commonTypes";
import PageWithSidebar from "../../components/sidebar/PageWithSidebar";
import React, {FormEvent, useState} from "react";
import {API_ENDPOINTS, PAGES} from "../../common/constants";
import SubPageHeader from "../../components/SubPageHeader";
import useFetchPaymentTypes from "../../hooks/payment/useFetchPaymentTypes";
import useFetchPaymentStatuses from "../../hooks/payment/useFetchPaymentStatuses";
import IdValuesSelect from "../../components/IdValuesSelect";
import {mapToIdValues} from "../../common/commonUtils";
import LoadingGif from "../../components/loading/LoadingGif";
import InputDropdown from "../../components/InputDropdown";
import {doGetRequestReturnJson} from "../../services/doGetRequestReturnJson";
import {doPostRequestReturnResponse} from "../../services/doPostRequestReturnResponse";

export default function DashboardDeclarePayment({loggedIn, setLoggedIn}: LoggedInProps) {
    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<number>(1);
    const [statusId, setStatusId] = useState<number>(NaN);
    const [typeId, setTypeId] = useState<number>(NaN);

    const [selectedLegalCaseOptionValue, setSelectedLegalCaseOptionValue] = useState("");
    const [legalCaseOptions, setLegalCaseOptions]: [SelectOption[], any] = useState([]);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [paymentTypes] = useFetchPaymentTypes();
    const [paymentStatuses] = useFetchPaymentStatuses();

    const handleLegalCaseTitleChange = (inputValue: string) => {
        setLegalCaseOptions([]);
        if (inputValue && inputValue.length > 0) {
            doGetRequestReturnJson(API_ENDPOINTS.searchLegalCaseByTitle + "/" + inputValue)
                .then(response => {
                    if (response && response.length > 0) {
                        const newLegalCaseOptions = response.map((legalCase: LegalCaseDto) => { return {
                            value: "" + legalCase.id,
                            label: legalCase.title + " #" + legalCase.id,
                        }});
                        setLegalCaseOptions(newLegalCaseOptions);
                    }
                });
        }
    };

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const requestBody : DeclarePaymentRequest = {
            description,
            amountInCents: amount,
            statusId,
            typeId,
            assignedLegalCaseId: selectedLegalCaseOptionValue ? parseInt(selectedLegalCaseOptionValue) : NaN,
        }

        doPostRequestReturnResponse(requestBody, API_ENDPOINTS.postDeclarePayment).then(response => {
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
        <SubPageHeader header={"Declare a payment"}/>
        {!paymentTypes || !paymentStatuses ? <LoadingGif/> : <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="mt-4 flex flex-col col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium leading-6">
                        Description
                    </label>
                    <div className="mt-2 flex flex-row items-center">
                        <input
                            required
                            value={description}
                            onChange={({target}) => setDescription(target.value)}
                            id="description"
                            type="text"
                            className="text-black block mr-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300
            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="mt-4 flex flex-col col-span-2">
                    <label htmlFor="amount" className="block text-sm font-medium leading-6">
                        Amount (in cents)
                    </label>
                    <div className="mt-2 flex flex-row items-center">
                        <input
                            required
                            min={1}
                            value={"" + amount}
                            onChange={({target}) => setAmount(target.value ? parseInt(target.value) : NaN)}
                            id="amount"
                            type="number"
                            className="text-black block mr-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300
            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="mt-4 flex flex-col col-span-2">
                    <span className="mb-2">Payment status</span>
                    <IdValuesSelect name="status" options={mapToIdValues(paymentStatuses)} handleSetId={setStatusId} />
                </div>

                <div className="mt-4 flex flex-col col-span-2">
                    <span className="mb-2">Payment type</span>
                    <IdValuesSelect name="type" options={mapToIdValues(paymentTypes)} handleSetId={setTypeId} />
                </div>
            </div>
            <div className="mt-4">
                <p className="mb-2">Assigned legal case title</p>
                <InputDropdown options={legalCaseOptions} handleChange={handleLegalCaseTitleChange}
                               handleSelect={setSelectedLegalCaseOptionValue} />
            </div>

            <hr/>
            <div className="flex flex-row items-center">
                <button
                    type="submit"
                    className="px-5 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                    Declare
                </button>
            </div>
            <div className="mt-3">
                {success && <div className="alert alert-success" role="alert">
                    <p>Payment was declared successfully.</p>
                    <span>Refer to the <a href={PAGES.payments}>payments</a> page to see updated payment list.</span>
                </div>
                }
                {error && <div className="alert alert-danger" role="alert">
                    <span>{error}</span>
                </div>
                }
            </div>
        </form>
        }
    </div>;

    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"dashboard"} contentElement={contentElement}/>;
}
