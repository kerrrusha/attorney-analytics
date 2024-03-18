import {LoggedInProps} from "../common/commonTypes";
import PageWithSidebar from "../components/sidebar/PageWithSidebar";

export default function Employees({loggedIn, setLoggedIn} : LoggedInProps) {
    const contentElement = <div>
        <div>1</div>
        <div>2</div>
    </div>;
    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"employees"} contentElement={contentElement} />;
}
