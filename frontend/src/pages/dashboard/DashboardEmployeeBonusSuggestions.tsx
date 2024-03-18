import { LoggedInProps } from "../../common/commonTypes";
import PageWithSidebar from "../../components/sidebar/PageWithSidebar";

export default function DashboardEmployeeBonusSuggestions({loggedIn, setLoggedIn}: LoggedInProps) {
    const contentElement = <div>
        bonus suggestions
    </div>;

    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"dashboard"} contentElement={contentElement}/>;
}
