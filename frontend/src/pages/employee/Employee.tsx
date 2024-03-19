import { useParams } from 'react-router-dom';
import PageWithSidebar from "../../components/sidebar/PageWithSidebar";
import {LoggedInProps} from "../../common/commonTypes";

export default function Employee({loggedIn, setLoggedIn}: LoggedInProps) {
    const { fullName } = useParams();

    const contentElement = <div>
        <h1>Employee Detail</h1>
        <p>Name: {fullName}</p>
    </div>;
    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"employees"} contentElement={contentElement}/>;
}
