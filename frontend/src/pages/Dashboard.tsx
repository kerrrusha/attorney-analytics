import { LoggedInProps } from "../common/commonTypes";
import PageWithSidebar from "../components/sidebar/PageWithSidebar";

export default function Dashboard({loggedIn, setLoggedIn}: LoggedInProps) {
    const contentElement = <div>
        hello
    </div>;
    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"dashboard"} contentElement={contentElement}/>;
}
