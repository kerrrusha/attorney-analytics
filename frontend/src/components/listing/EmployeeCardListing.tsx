import {EmployeeListingDto} from "../../common/commonTypes";
import {BLANK_PERSON_PHOTO_URL, PAGES} from "../../common/constants";
import {toKebabCase} from "../../common/commonUtils";

interface EmployeeCardProps {
    employees: Array<EmployeeListingDto>;
}

export default function EmployeeCardListing({employees}: EmployeeCardProps) {
    return (<>
        {employees.map((employee, index) =>
            <a key={index} href={PAGES.employees + "/" + toKebabCase(employee.fullName)}
               className="card background-secondary items-start justify-center no-underline pt-4 px-4 w-auto">
                <img src={employee.profilePhotoUrl ? employee.profilePhotoUrl : BLANK_PERSON_PHOTO_URL} alt="" width="250rem" height="250rem"/>
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
    </>);
}