import {AttorneysOfTheMonthDto, LoggedInProps} from "../../common/commonTypes";
import PageWithSidebar from "../../components/sidebar/PageWithSidebar";
import useFetchAttorneysOfTheMonth from "../../hooks/useFetchAttorneysOfTheMonth";
import {useAppSelector} from "../../hooks/useAppSelector";
import {selectAttorneysOfTheMonth} from "../../redux/slices/analyticsSlice";
import React from "react";
import LoadingGif from "../../components/loading/LoadingGif";
import {rateXvmColorValue} from "../../common/XvmColorValue";
import {GOLDEN_TRANSPARENT_COLOR} from "../../common/constants";

export default function DashboardEmployeeBonusSuggestions({loggedIn, setLoggedIn}: LoggedInProps) {
    const [attorneysOfTheMonthFetched] = useFetchAttorneysOfTheMonth();
    const attorneysOfTheMonth: AttorneysOfTheMonthDto = useAppSelector(selectAttorneysOfTheMonth)!;

    const ATTORNEYS_TO_GET_BONUS_AMOUNT = 3;

    const contentElement = <div>
        <div className="border-b p-2 flex flex-row justify-between align-items-center">
            <h4 className="text-header font-semibold">Employee bonus suggestions</h4>
        </div>
        <div className="mt-4 flex flex-col">
            <span>Employee bonus suggestions based in the first order on attorney's successfully closed rate*.</span>
            <span>The second order ranks the lowest titles (in order to equalize the chances, taking into account
                the authority of the more senior titles)</span>
            <p>The bonus is expected to be awarded to the following number of employees: {ATTORNEYS_TO_GET_BONUS_AMOUNT}</p>
            <div className="card background-secondary">
                <div className="card-body text-center">
                    {!attorneysOfTheMonthFetched ? <LoadingGif /> :
                        <table className="w-100" id="bonus-suggestions">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Attorney</th>
                                <th scope="col">Title</th>
                                <th scope="col">Successfully closed amount</th>
                                <th scope="col">Cases participated</th>
                                <th scope="col">Successfully closed rate*</th>
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
                                <td className={rateXvmColorValue.getColorClassName(e.successfullyClosedRate)}>{e.successfullyClosedRate}</td>
                            </tr>)}
                            </tbody>
                        </table>}
                    <div className="mt-5 text-start px-3 text-sm">
                        <span>
                            *Successfully closed rate of the month - rate of closed legal cases (with status SUCCESS) by attorney in last month
                            (participating in team also counts) to the total amount of cases participated in last month.
                        </span>
                        <p>
                            Can be in range from 0 to 1.
                        </p>
                        {rateXvmColorValue.getInfoReactElement()}
                    </div>
                </div>
            </div>
        </div>
    </div>;

    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"dashboard"} contentElement={contentElement}/>;
}
