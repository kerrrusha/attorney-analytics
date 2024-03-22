import {AttorneysOfTheMonthDto, LoggedInProps} from "../../common/commonTypes";
import PageWithSidebar from "../../components/sidebar/PageWithSidebar";
import useFetchAttorneysOfTheMonth from "../../hooks/useFetchAttorneysOfTheMonth";
import {useAppSelector} from "../../hooks/useAppSelector";
import {selectAttorneysOfTheMonth} from "../../redux/slices/analyticsSlice";
import React from "react";
import LoadingGif from "../../components/loading/LoadingGif";
import {rateXvmColorValue} from "../../common/XvmColorValue";
import {GOLDEN_TRANSPARENT_COLOR} from "../../common/constants";
import {formatNumber} from "../../common/commonUtils";
import SubPageHeader from "../../components/SubPageHeader";
import XvmAbout from "../../components/XvmAbout";
import {useTranslation} from "react-i18next";

export default function DashboardEmployeeBonusSuggestions({loggedIn, setLoggedIn}: LoggedInProps) {
    const [attorneysOfTheMonthFetched] = useFetchAttorneysOfTheMonth();
    const attorneysOfTheMonth: AttorneysOfTheMonthDto = useAppSelector(selectAttorneysOfTheMonth)!;
    const { t } = useTranslation();

    const ATTORNEYS_TO_GET_BONUS_AMOUNT = 3;

    const contentElement = <div>
        <SubPageHeader header={t("dashboard.bonus.name")} />
        <div className="mt-4 flex flex-col">
            <span>{t("dashboard.bonus.about1")}*.</span>
            <p>{t("dashboard.bonus.about2")}</p>
            <span>{t("dashboard.bonus.about3")}: {ATTORNEYS_TO_GET_BONUS_AMOUNT}</span>
            <p>{t("dashboard.bonus.about4")} <span style={{background: GOLDEN_TRANSPARENT_COLOR}}>{t("dashboard.bonus.about5")}</span>.</p>
            <div className="card background-secondary">
                <div className="card-body text-center">
                    {!attorneysOfTheMonthFetched ? <LoadingGif /> :
                        <table className="w-100" id="bonus-suggestions">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">{t("analytics.atty")}</th>
                                <th scope="col">{t("analytics.title")}</th>
                                <th scope="col">{t("dashboard.bonus.successClosed")}</th>
                                <th scope="col">{t("analytics.casesPart")}</th>
                                <th scope="col">{t("analytics.closedRate")}*</th>
                            </tr>
                            </thead>
                            <tbody>
                            {attorneysOfTheMonth.map((e, index) => <tr key={index}
                                 style={index < ATTORNEYS_TO_GET_BONUS_AMOUNT ? {background: GOLDEN_TRANSPARENT_COLOR} : {}}>
                                <th scope="row">{index + 1}</th>
                                <td>{e.attorneyFullName}</td>
                                <td>{e.title}</td>
                                <td>{e.successfullyClosedAmount}</td>
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
        </div>
    </div>;

    return (<PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={t("dashboard.name")} contentElement={contentElement}/>);
}
