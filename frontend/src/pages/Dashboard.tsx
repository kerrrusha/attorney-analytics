import {LoggedInProps, User} from "../common/commonTypes";
import PageWithSidebar from "../components/sidebar/PageWithSidebar";
import useFetchUser from "../hooks/useFetchUser";
import {useAppSelector} from "../hooks/useAppSelector";
import {selectUser} from "../redux/slices/authSlice";
import {haveIntersections} from "../common/commonUtils";
import {PAGES, ROLES} from "../common/constants";
import {useTranslation} from "react-i18next";

export default function Dashboard({loggedIn, setLoggedIn}: LoggedInProps) {
    const [userFetched] = useFetchUser();
    const user : User | null = useAppSelector(selectUser)!;
    const { t } = useTranslation();

    const buttonsData = [
        {
            name: t("dashboard.hire.name"),
            url: PAGES.dashboardHire,
            allowedRoles: [ROLES.ADMIN]
        },
        {
            name: t("dashboard.fire.name"),
            url: PAGES.dashboardFire,
            allowedRoles: [ROLES.ADMIN]
        },
        {
            name: t("dashboard.promote.name"),
            url: PAGES.dashboardPromoteEmployee,
            allowedRoles: [ROLES.ADMIN]
        },

        {
            name: t("dashboard.bonus.name"),
            url: PAGES.dashboardEmployeeBonusSuggestions,
            allowedRoles: [ROLES.ADMIN, ROLES.WORKER]
        },
        {
            name: t("dashboard.declare.name"),
            url: PAGES.dashboardDeclarePayment,
            allowedRoles: [ROLES.ADMIN]
        },
        {
            name: t("dashboard.addClient.name"),
            url: PAGES.dashboardAddNewClient,
            allowedRoles: [ROLES.ADMIN, ROLES.WORKER]
        }
    ]

    const contentElement = <div>
        <div className="flex flex-row flex-wrap">
            {
                userFetched && buttonsData.map((data, index) =>
                    haveIntersections(data.allowedRoles, user.roles) && <a key={index} href={data.url}
                   className="card background-secondary items-center justify-center no-underline">
                    <h5 className="my-4">{data.name}</h5>
                </a>)
            }
        </div>
    </div>;
    return (<PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={t("dashboard.name")} contentElement={contentElement}/>);
}
