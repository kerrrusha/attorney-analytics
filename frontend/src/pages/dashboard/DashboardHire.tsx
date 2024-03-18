import { LoggedInProps } from "../../common/commonTypes";
import PageWithSidebar from "../../components/sidebar/PageWithSidebar";

export default function DashboardHire({loggedIn, setLoggedIn}: LoggedInProps) {
    const contentElement = <div>
        hire
    </div>;

    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"dashboard"} contentElement={contentElement}/>;
}
