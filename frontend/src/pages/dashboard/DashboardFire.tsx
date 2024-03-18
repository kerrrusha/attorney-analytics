import { LoggedInProps } from "../../common/commonTypes";
import PageWithSidebar from "../../components/sidebar/PageWithSidebar";

export default function DashboardFire({loggedIn, setLoggedIn}: LoggedInProps) {
    const contentElement = <div>
        fire
    </div>;

    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"dashboard"} contentElement={contentElement}/>;
}
