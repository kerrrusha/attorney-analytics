import React from "react";
import SidebarButton from "./SidebarButton";

export default function Sidebar() {
    const buttonsData = [
        {name: "Dashboard", url: "", isActive: false, iconUrl: "https://www.svgrepo.com/show/520688/dashboard-5.svg"},
        {name: "Payments", url: "", isActive: false, iconUrl: "https://www.svgrepo.com/show/520688/dashboard-5.svg"},
        {name: "Workers", url: "", isActive: false, iconUrl: "https://www.svgrepo.com/show/520688/dashboard-5.svg"},
        {name: "Clients", url: "", isActive: false, iconUrl: "https://www.svgrepo.com/show/520688/dashboard-5.svg"},
        {name: "Cases", url: "", isActive: false, iconUrl: "https://www.svgrepo.com/show/520688/dashboard-5.svg"},
    ]

    return (
        <div className="w-[230px] flex flex-column background-secondary sticky height-not-header">
            {buttonsData.map((buttonData, index) =>
                <SidebarButton key={index} name={buttonData.name} url={buttonData.url}
                               isActive={buttonData.isActive} iconUrl={buttonData.iconUrl} />)}
        </div>
    );
}
