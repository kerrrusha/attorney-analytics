import {useParams} from 'react-router-dom';
import PageWithSidebar from "../../components/sidebar/PageWithSidebar";
import {LoggedInProps} from "../../common/commonTypes";
import useFetchEmployee from "../../hooks/employee/useFetchEmployee";
import LoadingGif from "../../components/loading/LoadingGif";

export default function Employee({loggedIn, setLoggedIn}: LoggedInProps) {
    const {fullName} = useParams();
    const [employee] = useFetchEmployee(fullName!);

    const contentElement = <div>
        {!employee ? <LoadingGif/> : <div className="px-3 py-2 flex flex-row mx-auto">
            <div className="flex flex-col flex-1 pr-5">
                <div>
                    <span className="display-4">{employee.firstName}</span>
                    <span className="ml-2 display-4">{employee.lastName}</span>
                </div>
                <h4 className="mt-3">{employee.title}</h4>
                <hr />
                <span className="mt-3">{employee.bio}</span>
            </div>
            <div className="flex flex-col">
                <img width={250} src={employee.profilePhotoUrl} alt="" />
                <div className="mt-3">
                    {employee.locations.map((value, index) => <div key={index} className="flex flex-row py-1">
                        <img width={24} height={24} src="https://img.icons8.com/color/48/marker--v1.png" alt="marker--v1" className="mr-1" />
                        <span>{value}</span>
                    </div>)}
                </div>
                <div className="mt-3">
                    {employee.phones.map((value, index) => <div key={index} className="flex flex-row py-1">
                        <img width={24} height={24} src="https://img.icons8.com/color/48/phone.png" alt="" className="mr-1" />
                        <span>{value}</span>
                    </div>)}
                </div>
                <div className="mt-3">
                    {employee.emails.map((value, index) => <div key={index} className="flex flex-row py-1">
                        <img width={24} height={24} src="https://img.icons8.com/color/48/new-post.png" alt="" className="mr-1" />
                        <span>{value}</span>
                    </div>)}
                </div>
                <div className="mt-3">
                    <h4 className="mt-3">Practice areas</h4>
                    {employee.practiceAreas.map((value, index) => <div key={index} className="flex flex-row py-1">
                        <span>{value}</span>
                    </div>)}
                </div>
                <div className="mt-3">
                    <h4 className="mt-3">Admissions</h4>
                    {employee.admissions.map((value, index) => <div key={index} className="flex flex-row py-1">
                        <span>{value}</span>
                    </div>)}
                </div>
            </div>
        </div>
        }
    </div>;
    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"employees"} contentElement={contentElement}/>;
}
