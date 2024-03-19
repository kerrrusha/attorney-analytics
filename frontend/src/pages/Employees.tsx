import {LoggedInProps} from "../common/commonTypes";
import PageWithSidebar from "../components/sidebar/PageWithSidebar";
import {PAGES} from "../common/constants";
import useFetchEmployeesGroupedByTitle from "../hooks/useFetchEmployeesGroupedByTitle";
import LoadingGif from "../components/loading/LoadingGif";
import {toKebabCase} from "../common/commonUtils";

export default function Employees({loggedIn, setLoggedIn}: LoggedInProps) {
    const [employeesGroupedByTitle] = useFetchEmployeesGroupedByTitle()!;

    const contentElement = <div className="px-5 pt-3">
        {!employeesGroupedByTitle ? <LoadingGif/> :
            employeesGroupedByTitle.map((titleToEmployees, index) =>
                <div key={index} className="mb-5">
                    <span className="display-6">{titleToEmployees.title}</span>
                    <hr/>
                    <div className="flex flex-row flex-wrap">
                        {titleToEmployees.data.map((employee, index) =>
                            <a key={index} href={PAGES.employees + toKebabCase(employee.fullName)}
                               className="card background-secondary items-start justify-center no-underline pt-4 px-4 w-auto">
                                <img src={employee.profilePhotoUrl} alt="" width="250rem" height="250rem"/>
                                <h5 className="mt-3">{employee.fullName}</h5>
                                <i>{employee.title}</i>
                                <div className="flex flex-col mt-2">
                                    <div className="flex flex-col pl-2 border-start mb-3">
                                        {employee.emails.map((email, index) =>
                                            <span key={index}>{email}</span>)}
                                    </div>
                                    <div className="flex flex-col pl-2 border-start mb-3">
                                        {employee.phones.map((phone, index) =>
                                            <span key={index}>{phone}</span>)}
                                    </div>
                                </div>
                            </a>)}
                    </div>
                </div>)}
    </div>;
    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"employees"} contentElement={contentElement}/>;
}
