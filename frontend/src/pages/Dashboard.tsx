import {LoggedInProps, User} from "../common/commonTypes";
import PageWithSidebar from "../components/sidebar/PageWithSidebar";
import useFetchUser from "../hooks/useFetchUser";
import {useAppSelector} from "../hooks/useAppSelector";
import {selectUser} from "../redux/slices/authSlice";
import {haveIntersections} from "../common/commonUtils";
import {PAGES, ROLES} from "../common/constants";

export default function Dashboard({loggedIn, setLoggedIn}: LoggedInProps) {
    const [userFetched] = useFetchUser();
    const user : User | null = useAppSelector(selectUser)!;

    const buttonsData = [
        {
            name: "Hire employee",
            url: PAGES.dashboardHire,
            allowedRoles: [ROLES.ADMIN]
        },
        {
            name: "Fire employee",
            url: PAGES.dashboardFire,
            allowedRoles: [ROLES.ADMIN]
        },
        {
            name: "Promote employee",
            url: PAGES.dashboardPromoteEmployee,
            allowedRoles: [ROLES.ADMIN]
        },

        {
            name: "Employee salary bonus suggestions",
            url: PAGES.dashboardEmployeeBonusSuggestions,
            allowedRoles: [ROLES.ADMIN, ROLES.WORKER]
        },
        {
            name: "Declare a payment",
            url: PAGES.dashboardDeclarePayment,
            allowedRoles: [ROLES.ADMIN]
        },
        {
            name: "Add new client",
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
    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"dashboard"} contentElement={contentElement}/>;
}
