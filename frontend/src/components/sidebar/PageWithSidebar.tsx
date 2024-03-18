import Header from "../header/Header";
import Sidebar from "./Sidebar";
import {Dispatch, ReactElement} from "react";
import {toPascalCase} from "../../common/commonUtils";

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
            <div className="overflow-x-scroll overflow-y-scroll scrollbar-hide height-not-header flex flex-row">
                <Sidebar activePageName={pageName} />
                <div className="flex flex-col w-100 background-primary">
                    <p className="mx-4 mt-3 mb-0 display-5">{toPascalCase(pageName)}</p>
                    <hr />
                    <div className="px-3">
                        {contentElement}
                    </div>
                </div>
            </div>
        </div>
    );
}
