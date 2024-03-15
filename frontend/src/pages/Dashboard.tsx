import {InputTarget, KeyValueChartData, LoggedInProps} from "../common/commonTypes";
import PageWithSidebar from "../components/sidebar/PageWithSidebar";
import {useState} from "react";
import {Bar, Doughnut} from "react-chartjs-2"
import 'chart.js/auto';
import {createChartData, createOptionsHoverLabelWithPostfix} from "../common/commonUtils";

export default function Dashboard({loggedIn, setLoggedIn} : LoggedInProps) {
    const [dateFrom, setDateFrom] = useState(getYesterday());
    const [dateTo, setDateTo] = useState(getToday());

    function getToday() {
        const today = new Date();
        return today.toISOString().slice(0, 10);
    }

    function getYesterday() {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return yesterday.toISOString().slice(0, 10);
    }

    const caseTypeIncomesFetchedData: Array<KeyValueChartData> = [
        {
            key: "Legal Consultation",
            value: 100
        },
        {
            key: "Legal Document Preparation",
            value: 110
        },
        {
            key: "Court Representation",
            value: 110
        },
        {
            key: "Legal Research",
            value: 30
        },
        {
            key: "Contract Drafting",
            value: 110
        },
        {
            key: "Other",
            value: 10
        },
    ];
    const caseTypeOutcomesFetchedData: Array<KeyValueChartData> = caseTypeIncomesFetchedData;

    const clientIncomesFetchedData: Array<KeyValueChartData> = [
        {
            key: "John Petrucci",
            value: 2500
        },
        {
            key: "James Hetfield",
            value: 110000
        },
        {
            key: "Kirk Hammett",
            value: 14000
        },
        {
            key: "Albert Einstein",
            value: 34000
        },
        {
            key: "Elon Musk",
            value: 300000
        }
    ];
    const clientOutcomesFetchedData: Array<KeyValueChartData> = clientIncomesFetchedData;

    const monthIncomesFetchedData: Array<KeyValueChartData> = [
        {
            key: "March",
            value: 32500
        },
        {
            key: "April",
            value: 40000
        },
        {
            key: "May",
            value: 34000
        },
        {
            key: "June",
            value: 14000
        }
    ];
    const monthOutcomesFetchedData: Array<KeyValueChartData> = monthIncomesFetchedData;

    const [caseTypeIncomesData, setCaseTypeIncomesData] = useState(createChartData(caseTypeIncomesFetchedData));
    const [caseTypeOutcomesData, setCaseTypeOutcomesData] = useState(createChartData(caseTypeOutcomesFetchedData));
    const [clientIncomesData, setClientIncomesData] = useState(createChartData(clientIncomesFetchedData));
    const [clientOutcomesData, setClientOutcomesData] = useState(createChartData(clientOutcomesFetchedData));
    const [monthIncomesData, setmonthIncomesData] = useState(createChartData(monthIncomesFetchedData));
    const [monthOutcomesData, setmonthOutcomesData] = useState(createChartData(monthOutcomesFetchedData));

    const contentElement = <div className="px-3">
        <div>
            <h5 className="text-m">Show stats between:</h5>
            <div className="my-3 flex flex-row">
                <div className="flex flex-row items-center">
                    <label htmlFor="date-from"
                           className="block mr-2 text-m">Date from:</label>
                    <input type="date" id="date-from" value={dateFrom}
                           onChange={({target} : InputTarget) => setDateFrom(target.value)} required />
                </div>
                <div className="mx-5 flex flex-row items-center">
                    <label htmlFor="date-to"
                           className="block mr-2 text-m">Date to:</label>
                    <input type="date" id="date-to" value={dateTo}
                           onChange={({target} : InputTarget) => setDateTo(target.value)} required />
                </div>
            </div>
        </div>
        <div className="flex flex-row flex-wrap">
            <div className="card background-secondary">
                <div className="card-body text-center">
                    <h5 className="mb-3">Incomes by case type</h5>
                    <Doughnut data={caseTypeIncomesData} options={createOptionsHoverLabelWithPostfix(caseTypeIncomesFetchedData, "$")} />
                </div>
            </div>
            <div className="card background-secondary">
                <div className="card-body text-center">
                    <h5 className="mb-3">Outcomes by case type</h5>
                    <Doughnut data={caseTypeOutcomesData} options={createOptionsHoverLabelWithPostfix(caseTypeOutcomesFetchedData, "$")} />
                </div>
            </div>
            <div className="card background-secondary">
                <div className="card-body text-center">
                    <h5 className="mb-3">Incomes by clients</h5>
                    <Doughnut data={clientIncomesData} options={createOptionsHoverLabelWithPostfix(clientIncomesFetchedData, "$")} />
                </div>
            </div>
            <div className="card background-secondary">
                <div className="card-body text-center">
                    <h5 className="mb-3">Outcomes by clients</h5>
                    <Doughnut data={clientOutcomesData} options={createOptionsHoverLabelWithPostfix(clientOutcomesFetchedData, "$")} />
                </div>
            </div>
            <div className="card background-secondary">
                <div className="card-body text-center">
                    <h5 className="mb-3">Incomes by months</h5>
                    <Bar data={monthIncomesData} options={createOptionsHoverLabelWithPostfix(monthIncomesFetchedData, "$", false)} />
                </div>
            </div>
            <div className="card background-secondary">
                <div className="card-body text-center">
                    <h5 className="mb-3">Outcomes by months</h5>
                    <Bar data={monthOutcomesData} options={createOptionsHoverLabelWithPostfix(monthOutcomesFetchedData, "$", false)} />
                </div>
            </div>
        </div>
        <hr />
        <div className="flex flex-row flex-wrap large">
            <div className="card background-secondary">
                <div className="card-body text-center">
                    <p className="mb-3 display-6">Attorneys of the month</p>
                    <table className="w-100">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Attorney</th>
                                <th scope="col">Title</th>
                                <th scope="col">Cases participated</th>
                                <th scope="col">Total income</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Saul Goodman</td>
                                <td>CEO</td>
                                <td>15</td>
                                <td>20 234$</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Mark Rober</td>
                                <td>Of Counsel</td>
                                <td>9</td>
                                <td>10 234$</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Mr Beast</td>
                                <td>Partner</td>
                                <td>5</td>
                                <td>1 234$</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card background-secondary">
                <div className="card-body text-center">
                    <p className="mb-3 display-6">Latest closed cases</p>

                    <table className="w-100">
                        <thead>
                        <tr>
                            <th scope="col">Closed date</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Client</th>
                            <th scope="col">Assigned workers</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">15.03.2024</th>
                            <td>Saul Goodman</td>
                            <td>20 234$</td>
                            <td>CoolFirm inc.</td>
                            <td>Saul Goodman</td>
                        </tr>
                        <tr>
                            <th scope="row">13.03.2024</th>
                            <td>Mark Rober</td>
                            <td>10 234$</td>
                            <td>CoolFirm inc.</td>
                            <td>Saul Goodman, Mark Rober</td>
                        </tr>
                        <tr>
                            <th scope="row">12.03.2024</th>
                            <td>Mr Beast</td>
                            <td>1 234$</td>
                            <td>CoolFirm inc.</td>
                            <td>Saul Goodman</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card background-secondary">
                <div className="card-body px-5">
                    <p className="text-center display-6">About us</p>

                    <table className="mx-auto text-start">
                        <tbody>
                        <tr>
                            <th scope="row" colSpan={2}>
                                <p className="my-3 mb-2 text-lg">Workers</p>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">Employed:</th>
                            <td>100</td>
                        </tr>
                        <tr>
                            <th scope="row" colSpan={2}>
                                <p className="my-3 mb-2 text-lg">Clients</p>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">Total:</th>
                            <td>100</td>
                        </tr>
                        <tr>
                            <th scope="row" colSpan={2}>
                                <p className="my-3 mb-2 text-lg">Cases</p>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">Total:</th>
                            <td>100</td>
                        </tr>
                        <tr>
                            <th scope="row">Success:</th>
                            <td>100</td>
                        </tr>
                        <tr>
                            <th scope="row">In progress:</th>
                            <td>100</td>
                        </tr>
                        <tr>
                            <th scope="row">Failed:</th>
                            <td>100</td>
                        </tr>
                        <tr>
                            <th scope="row">Rejected:</th>
                            <td>100</td>
                        </tr>
                        <tr>
                            <th scope="row">Pending:</th>
                            <td>100</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>;
    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"dashboard"} contentElement={contentElement} />;
}