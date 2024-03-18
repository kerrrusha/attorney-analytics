import { LoggedInProps } from "../../common/commonTypes";
import PageWithSidebar from "../../components/sidebar/PageWithSidebar";

export default function DashboardPromoteEmployee({loggedIn, setLoggedIn}: LoggedInProps) {
    const contentElement = <div>
        promote
    </div>;

    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"dashboard"} contentElement={contentElement}/>;
}
