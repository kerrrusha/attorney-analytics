import React from "react";
import SidebarButton from "./SidebarButton";
import {PAGES} from "../../common/constants";

interface SidebarProps {
    activePageName: string;
}

export default function Sidebar({activePageName}: SidebarProps) {
    const buttonsData = [
        {name: "Dashboard", url: PAGES.dashboard, iconUrl: "https://www.svgrepo.com/show/520688/dashboard-5.svg"},
        {name: "Payments", url: PAGES.payments, iconUrl: "https://www.svgrepo.com/show/500409/money.svg"},
        {name: "Workers", url: PAGES.workers, iconUrl: "https://www.svgrepo.com/show/374474/team-member.svg"},
        {name: "Clients", url: PAGES.clients, iconUrl: "https://www.svgrepo.com/show/374595/client.svg"},
        {name: "Cases", url: PAGES.cases, iconUrl: "https://www.svgrepo.com/show/374577/case.svg"},
    ]

    return (
        <div className="w-[230px] flex flex-column background-secondary sticky py-4">
            {buttonsData.map((buttonData, index) =>
                <SidebarButton key={index} name={buttonData.name} url={buttonData.url}
                               isActive={buttonData.name.toLowerCase() === activePageName} iconUrl={buttonData.iconUrl} />)}
        </div>
    );
}
