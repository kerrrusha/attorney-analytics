import {
    AboutUsDto,
    AttorneysOfTheMonthDto,
    InputTarget,
    LatestClosedCasesDto,
    LoggedInProps, StatsByDatesDto
} from "../common/commonTypes";
import PageWithSidebar from "../components/sidebar/PageWithSidebar";
import {useState} from "react";
import 'chart.js/auto';
import {
    formatNumber,
    getProfitChar,
    getProfitColorClass,
    getStatusColorClass,
    toPascalCase
} from "../common/commonUtils";
import useFetchAboutUs from "../hooks/useFetchAboutUs";
import {useAppSelector} from "../hooks/useAppSelector";
import {
    selectAboutUs,
    selectAttorneysOfTheMonth,
    selectLatestClosedCases,
    selectStatsByDates
} from "../redux/slices/analyticsSlice";
import LoadingGif from "../components/loading/LoadingGif";
import {rateXvmColorValue} from "../common/XvmColorValue";
import useFetchLatestClosedCases from "../hooks/legal_case/useFetchLatestClosedCases";
import {createIncomeOutcomeChart, createSimpleDoughnut} from "../common/chartHelper";
import useFetchAttorneysOfTheMonth from "../hooks/useFetchAttorneysOfTheMonth";
import useFetchStatsByDates from "../hooks/useFetchStatsByDates";
import {useTranslation} from "react-i18next";
import XvmAbout from "../components/XvmAbout";

export default function Analytics({loggedIn, setLoggedIn} : LoggedInProps) {
    // const [dateFrom, setDateFrom] = useState(getYesterday());
    // const [dateTo, setDateTo] = useState(getToday());
    const [dateFrom, setDateFrom] = useState('2023-09-01');
    const [dateTo, setDateTo] = useState('2024-03-31');
    const [datesError, setDatesError] = useState('');
    const BAD_DATE_FROM = "Date-from value should be before date-to.";
    const BAD_DATE_TO = "Date-to value should be after date-from.";
    const { t } = useTranslation();

    // function getToday() {
    //     const today = new Date();
    //     return today.toISOString().slice(0, 10);
    // }
    //
    // function getYesterday() {
    //     const today = new Date();
    //     const yesterday = new Date(today);
    //     yesterday.setDate(today.getDate() - 1);
    //     return yesterday.toISOString().slice(0, 10);
    // }

    const trySetDateFrom = (newDateFrom: string) => {
        if (new Date(newDateFrom) >= new Date(dateTo)) {
            setDatesError(BAD_DATE_FROM);
            return;
        }
        setDateFrom(newDateFrom);
        setDatesError('');
        setStatsByDatesFetched(false);
    };

    const trySetDateTo = (newDateTo: string) => {
        if (new Date(newDateTo) <= new Date(dateFrom)) {
            setDatesError(BAD_DATE_TO);
            return;
        }
        setDateTo(newDateTo);
        setDatesError('');
        setStatsByDatesFetched(false);
    };

    const [statsByDatesFetched, setStatsByDatesFetched] = useFetchStatsByDates(dateFrom, dateTo);
    const statsByDates: StatsByDatesDto = useAppSelector(selectStatsByDates)!;

    const [attorneysOfTheMonthFetched] = useFetchAttorneysOfTheMonth();
    const attorneysOfTheMonth: AttorneysOfTheMonthDto = useAppSelector(selectAttorneysOfTheMonth)!;

    const [latestClosedCasesFetched] = useFetchLatestClosedCases();
    const latestClosedCases: LatestClosedCasesDto = useAppSelector(selectLatestClosedCases)!;

    const [aboutUsFetched] = useFetchAboutUs();
    const aboutUs: AboutUsDto = useAppSelector(selectAboutUs)!;

    const getAboutUsTotalCases = () => {
        return Object.values(aboutUs.caseStatusToAmount).reduce((acc, val) => acc + val, 0);
    };

    const contentElement = <div>
        <div>
            <h5 className="text-m">{t("analytics.showStatsBetween")}:</h5>
            <div className="my-3 flex flex-row">
                <div className="flex flex-row items-center">
                    <label htmlFor="date-from"
                           className="block mr-2 text-m">{t("analytics.dateFrom")}:</label>
                    <input type="date" id="date-from" value={dateFrom}
                           onChange={({target} : InputTarget) => trySetDateFrom(target.value)} required />
                </div>
                <div className="mx-5 flex flex-row items-center">
                    <label htmlFor="date-to"
                           className="block mr-2 text-m">{t("analytics.dateTo")}:</label>
                    <input type="date" id="date-to" value={dateTo}
                           onChange={({target} : InputTarget) => trySetDateTo(target.value)} required />
                </div>
            </div>
            {
                datesError && datesError.length > 0 &&
                <div className="alert alert-danger" role="alert">
                    {datesError}
                </div>
            }
        </div>
        {!statsByDatesFetched ? <LoadingGif /> :
        <div className="flex flex-row flex-wrap">
            <div className="card background-secondary">
                <div className="card-body text-center">
                    <h5 className="mb-3">{t("analytics.incomesCase")}</h5>
                    {createSimpleDoughnut(statsByDates.caseTypeIncomesOutcomes.incomes)}
                </div>
            </div>
            <div className="card background-secondary">
                <div className="card-body text-center">
                    <h5 className="mb-3">{t("analytics.outcomesCase")}</h5>
                    {createSimpleDoughnut(statsByDates.caseTypeIncomesOutcomes.outcomes)}
                </div>
            </div>
            <div className="card background-secondary">
                <div className="card-body text-center">
                    <h5 className="mb-3">{t("analytics.incomesClient")}</h5>
                    {createSimpleDoughnut(statsByDates.clientIncomesOutcomes.incomes)}
                </div>
            </div>
            <div className="card background-secondary">
                <div className="card-body text-center">
                    <h5 className="mb-3">{t("analytics.outcomesClient")}</h5>
                    {createSimpleDoughnut(statsByDates.clientIncomesOutcomes.outcomes)}
                </div>
            </div>
            <div className="card background-secondary" style={{width: "51.6rem"}}>
                <div className="card-body text-center">
                    <h5 className="mb-3">{t("analytics.ioByMonths")}, $</h5>
                    {createIncomeOutcomeChart(statsByDates.monthIncomesOutcomes.incomes, statsByDates.monthIncomesOutcomes.outcomes)}
                </div>
            </div>
        </div>
        }
        <hr />
        <div className="flex flex-row flex-wrap large">
            <div className="card background-secondary">
                <div className="card-body text-center">
                    <p className="mb-3 display-6">{t("analytics.attysOfTheMonth")}</p>

                    {!attorneysOfTheMonthFetched ? <LoadingGif /> :
                    <table className="w-100">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">{t("analytics.atty")}</th>
                                <th scope="col">{t("analytics.title")}</th>
                                <th scope="col">{t("analytics.casesPart")}</th>
                                <th scope="col">{t("analytics.closedRate")}*</th>
                            </tr>
                        </thead>
                        <tbody>
                        {attorneysOfTheMonth.map((e, index) => <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{e.attorneyFullName}</td>
                            <td>{e.title}</td>
                            <td>{e.casesParticipated}</td>
                            <td className={rateXvmColorValue.getColorClassName(e.successfullyClosedRate)}>
                                {formatNumber(e.successfullyClosedRate)}
                            </td>
                        </tr>)}
                        </tbody>
                    </table>}
                    <div className="mt-5 text-start px-3 text-sm">
                        <span>
                            *{t("analytics.closedRateDesc1")}
                        </span>
                        <p>
                            {t("analytics.closedRateDesc2")}
                        </p>
                        <XvmAbout xvm={rateXvmColorValue} />
                    </div>
                </div>
            </div>
            <div className="card background-secondary">
                <div className="card-body text-center">
                    <p className="mb-3 display-6">{t("analytics.latestClosed")}</p>

                    {!latestClosedCasesFetched ? <LoadingGif /> :
                    <table className="w-100">
                        <thead>
                        <tr>
                            <th scope="col">{t("analytics.closedDate")}</th>
                            <th scope="col">{t("analytics.title")}</th>
                            <th scope="col">{t("analytics.status")}</th>
                            <th scope="col">{t("analytics.profit")}</th>
                            <th scope="col">{t("analytics.clients")}</th>
                            <th scope="col">{t("analytics.assAttys")}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {latestClosedCases.map((e, index) => <tr key={index}>
                            <th scope="row">{e.closedDate}</th>
                            <td>{e.title}</td>
                            <td className={getStatusColorClass(e.status)}>{e.status}</td>
                            <td className={getProfitColorClass(e.profit) + " px-3"}>
                                <div className="flex flex-row justify-around">
                                    <span>{getProfitChar(e.profit)}</span>
                                    <span>{e.profit}$</span>
                                </div>
                            </td>
                            <td>{e.clients}</td>
                            <td>{e.assignedAttorneys}</td>
                        </tr>)}
                        </tbody>
                    </table>}
                </div>
            </div>
        </div>
        <div className="flex flex-row flex-wrap">
            <div className="card background-secondary">
                <div className="card-body px-5">
                    <p className="text-center display-6">{t("analytics.firmState")}</p>

                    {!aboutUsFetched ? <LoadingGif /> :
                        <table id="about-us" className="mx-auto text-start">
                            <tbody>
                            <tr>
                                <th scope="row" colSpan={2}>
                                    <p className="my-3 mb-2 text-lg">{t("analytics.workers")}</p>
                                </th>
                            </tr>
                            <tr>
                                <th scope="row">{t("analytics.total")}:</th>
                                <td>{aboutUs.workers}</td>
                            </tr>
                            <tr>
                                <th scope="row" colSpan={2}>
                                    <p className="my-3 mb-2 text-lg">{t("analytics.clients1")}</p>
                                </th>
                            </tr>
                            <tr>
                                <th scope="row">{t("analytics.total")}:</th>
                                <td>{aboutUs.clients}</td>
                            </tr>
                            <tr>
                                <th scope="row" colSpan={2}>
                                    <p className="my-3 mb-2 text-lg">{t("analytics.cases")}</p>
                                </th>
                            </tr>
                            <tr>
                                <th scope="row">{t("analytics.total")}:</th>
                                <td>{getAboutUsTotalCases()}</td>
                            </tr>
                            {Object.keys(aboutUs.caseStatusToAmount).map((caseStatusName, index) => {
                                return <tr key={index}>
                                    <th scope="row">{toPascalCase(caseStatusName)}:</th>
                                    <td>{aboutUs.caseStatusToAmount[caseStatusName]}</td>
                                </tr>;
                            })}
                            </tbody>
                        </table>}
                </div>
            </div>
        </div>
    </div>;
    return (<PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={t("analytics.name")} contentElement={contentElement} />);
}
