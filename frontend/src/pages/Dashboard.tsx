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

    const attorneysOfTheMonth = [
        {
            attorney: "Saul Goodman",
            title: "CEO",
            casesParticipated: 15,
            totalIncome: "20 234$"
        },
        {
            attorney: "Mark Rober",
            title: "Of Counsel",
            casesParticipated: 9,
            totalIncome: "10 234$"
        },
        {
            attorney: "Mr Beast",
            title: "Partner",
            casesParticipated: 5,
            totalIncome: "1 234$"
        },
    ];

    const latestClosedCases = [
        {
            closedDate: "Saul Goodman",
            title: "Some court action",
            description: "Was very hard but we won",
            client: "Big Boss",
            assignedAttorneys: 15
        },
        {
            closedDate: "Saul Goodman",
            title: "Some court action",
            description: "Was very hard but we won",
            client: "Big Boss",
            assignedAttorneys: 15
        },
        {
            closedDate: "Saul Goodman",
            title: "Some court action",
            description: "Was very hard but we won",
            client: "Big Boss",
            assignedAttorneys: 15
        },
    ];

    const aboutUs = {
        workers: 145,
        clients: 134,
        cases: {
            total: 345,
            success: 43,
            inProgress: 34,
            failed: 23,
            rejected: 23,
            pending: 5
        }
    };

    const [caseTypeIncomesData, setCaseTypeIncomesData] = useState(createChartData(caseTypeIncomesFetchedData));
    const [caseTypeOutcomesData, setCaseTypeOutcomesData] = useState(createChartData(caseTypeOutcomesFetchedData));
    const [clientIncomesData, setClientIncomesData] = useState(createChartData(clientIncomesFetchedData));
    const [clientOutcomesData, setClientOutcomesData] = useState(createChartData(clientOutcomesFetchedData));
    const [monthIncomesData, setMonthIncomesData] = useState(createChartData(monthIncomesFetchedData));
    const [monthOutcomesData, setMonthOutcomesData] = useState(createChartData(monthOutcomesFetchedData));

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
                        {attorneysOfTheMonth.map((e, index) => <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{e.attorney}</td>
                            <td>{e.title}</td>
                            <td>{e.casesParticipated}</td>
                            <td>{e.totalIncome}</td>
                        </tr>)}
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
                            <th scope="col">Assigned attorneys</th>
                        </tr>
                        </thead>
                        <tbody>
                        {latestClosedCases.map(e => <tr>
                            <th scope="row">{e.closedDate}</th>
                            <td>{e.title}</td>
                            <td>{e.description}</td>
                            <td>{e.client}</td>
                            <td>{e.assignedAttorneys}</td>
                        </tr>)}
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
                            <th scope="row">Total:</th>
                            <td>{aboutUs.workers}</td>
                        </tr>
                        <tr>
                            <th scope="row" colSpan={2}>
                                <p className="my-3 mb-2 text-lg">Clients</p>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">Total:</th>
                            <td>{aboutUs.clients}</td>
                        </tr>
                        <tr>
                            <th scope="row" colSpan={2}>
                                <p className="my-3 mb-2 text-lg">Cases</p>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">Total:</th>
                            <td>{aboutUs.cases.total}</td>
                        </tr>
                        <tr>
                            <th scope="row">Success:</th>
                            <td>{aboutUs.cases.success}</td>
                        </tr>
                        <tr>
                            <th scope="row">In progress:</th>
                            <td>{aboutUs.cases.inProgress}</td>
                        </tr>
                        <tr>
                            <th scope="row">Failed:</th>
                            <td>{aboutUs.cases.failed}</td>
                        </tr>
                        <tr>
                            <th scope="row">Rejected:</th>
                            <td>{aboutUs.cases.rejected}</td>
                        </tr>
                        <tr>
                            <th scope="row">Pending:</th>
                            <td>{aboutUs.cases.pending}</td>
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
