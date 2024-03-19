import {useParams} from 'react-router-dom';
import PageWithSidebar from "../../components/sidebar/PageWithSidebar";
import {LoggedInProps} from "../../common/commonTypes";
import useFetchEmployee from "../../hooks/useFetchEmployee";
import LoadingGif from "../../components/loading/LoadingGif";

export default function Employee({loggedIn, setLoggedIn}: LoggedInProps) {
    const {fullName} = useParams();

    const [employee] = useFetchEmployee(fullName!);

    const contentElement = <div>
        <h1>Employee Detail</h1>
        <p>Name: {fullName}</p>
        {!employee ? <LoadingGif/> : <div>
            <span>{employee.id}</span>
            <span>{employee.firstName}</span>
            <span>{employee.lastName}</span>
            <span>{employee.title}</span>
            <span>{employee.bio}</span>
        </div>
        }
    </div>;
    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"employees"} contentElement={contentElement}/>;
}
