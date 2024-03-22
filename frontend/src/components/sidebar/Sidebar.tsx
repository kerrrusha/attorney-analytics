import React from "react";
import SidebarButton from "./SidebarButton";
import {PAGES, ROLES} from "../../common/constants";
import {haveIntersections} from "../../common/commonUtils";
import {User} from "../../common/commonTypes";
import {useAppSelector} from "../../hooks/useAppSelector";
import {selectUser} from "../../redux/slices/authSlice";
import {useTranslation} from "react-i18next";

interface SidebarProps {
    activePageName: string;
}

export default function Sidebar({activePageName}: SidebarProps) {
    const user : User | null = useAppSelector(selectUser)!;
    const { t } = useTranslation();

    const buttonsData = [
        {
            name: t("analytics"),
            allowedRoles: [ROLES.ADMIN],
            url: PAGES.analytics,
            iconUrl: "https://www.svgrepo.com/show/529625/graph.svg"
        },
        {
            name: t("dashboard"),
            allowedRoles: [ROLES.ADMIN, ROLES.WORKER],
            url: PAGES.dashboard,
            iconUrl: "https://www.svgrepo.com/show/520688/dashboard-5.svg"
        },
        {
            name: t("payments"),
            allowedRoles: [ROLES.ADMIN],
            url: PAGES.payments,
            iconUrl: "https://www.svgrepo.com/show/500409/money.svg"
        },
        {
            name: t("employees"),
            allowedRoles: [ROLES.ADMIN, ROLES.WORKER],
            url: PAGES.employees,
            iconUrl: "https://www.svgrepo.com/show/374474/team-member.svg"
        },
        {
            name: t("clients"),
            allowedRoles: [ROLES.ADMIN, ROLES.WORKER],
            url: PAGES.clients,
            iconUrl: "https://www.svgrepo.com/show/374595/client.svg"
        },
        {
            name: t("cases"),
            allowedRoles: [ROLES.ADMIN, ROLES.WORKER],
            url: PAGES.cases,
            iconUrl: "https://www.svgrepo.com/show/374577/case.svg"
        },
    ]

    return (
        user && <div className="w-[230px] flex flex-column background-secondary sticky py-4" style={{zIndex: 50}}>
            {buttonsData.map((buttonData, index) =>
                haveIntersections(buttonData.allowedRoles, user.roles) &&
                <SidebarButton key={index} name={buttonData.name} url={buttonData.url}
                               isActive={buttonData.name.toLowerCase() === activePageName}
                               iconUrl={buttonData.iconUrl}/>)}
        </div>
    );
}
