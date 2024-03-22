import {LoggedInProps} from "../common/commonTypes";
import PageWithSidebar from "../components/sidebar/PageWithSidebar";
import useFetchEmployeesGroupedByTitle from "../hooks/employee/useFetchEmployeesGroupedByTitle";
import LoadingGif from "../components/loading/LoadingGif";
import EmployeeCardListing from "../components/listing/EmployeeCardListing";
import {useTranslation} from "react-i18next";

export default function Employees({loggedIn, setLoggedIn}: LoggedInProps) {
    const [employeesGroupedByTitle] = useFetchEmployeesGroupedByTitle()!;
    const { t } = useTranslation();

    const contentElement = <div className="px-5 pt-3">
        {!employeesGroupedByTitle ? <LoadingGif/> :
            employeesGroupedByTitle.map((titleToEmployees, index) =>
                <div key={index} className="mb-5">
                    <span className="display-6">{titleToEmployees.title}</span>
                    <hr/>
                    <div className="flex flex-row flex-wrap">
                        <EmployeeCardListing employees={titleToEmployees.data} />
                    </div>
                </div>)}
    </div>;
    return (<PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={t("employees.name")} contentElement={contentElement}/>);
}
