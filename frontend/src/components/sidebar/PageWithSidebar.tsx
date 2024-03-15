import Header from "../header/Header";
import Sidebar from "./Sidebar";
import {Dispatch, ReactElement} from "react";

interface PageWithSidebarProps {
    loggedIn: boolean;
    setLoggedIn: Dispatch<any>;
    pageName: string;
    contentElement: ReactElement;
}

export default function PageWithSidebar({loggedIn, setLoggedIn, pageName, contentElement} : PageWithSidebarProps) {
    return (
        <div className="main-page">
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <div className=" height-not-header flex flex-row">
                <Sidebar activePageName={pageName} />
                {contentElement}
            </div>
        </div>
    );
}
