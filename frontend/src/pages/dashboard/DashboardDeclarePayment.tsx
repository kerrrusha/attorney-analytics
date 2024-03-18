import { LoggedInProps } from "../../common/commonTypes";
import PageWithSidebar from "../../components/sidebar/PageWithSidebar";

export default function DashboardDeclarePayment({loggedIn, setLoggedIn}: LoggedInProps) {
    const contentElement = <div>
        declare
    </div>;

    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"dashboard"} contentElement={contentElement}/>;
}
