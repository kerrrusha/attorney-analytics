import {LoggedInProps, User, UserRoles} from "../common/commonTypes";
import PageWithSidebar from "../components/sidebar/PageWithSidebar";
import useFetchUser from "../hooks/useFetchUser";
import {useAppSelector} from "../hooks/useAppSelector";
import {selectUser} from "../redux/slices/authSlice";
import {haveIntersections} from "../common/commonUtils";
import {PAGES} from "../common/constants";

export default function Dashboard({loggedIn, setLoggedIn}: LoggedInProps) {
    const [userFetched] = useFetchUser();
    const user : User | null = useAppSelector(selectUser)!;

    const buttonsData = [
        {
            name: "Hire employee",
            url: PAGES.dashboardHire,
            allowedRoles: [UserRoles.ADMIN]
        },
        {
            name: "Fire employee",
            url: PAGES.dashboardFire,
            allowedRoles: [UserRoles.ADMIN]
        },
        {
            name: "Employee salary bonus suggestions",
            url: PAGES.dashboardEmployeeBonusSuggestions,
            allowedRoles: [UserRoles.ADMIN, UserRoles.WORKER]
        },
        {
            name: "Employee promotion suggestions",
            url: PAGES.dashboardEmployeePromotionSuggestions,
            allowedRoles: [UserRoles.ADMIN]
        },
        {
            name: "Promote employee",
            url: PAGES.dashboardPromoteEmployee,
            allowedRoles: [UserRoles.ADMIN]
        },
        {
            name: "Declare a payment",
            url: PAGES.dashboardDeclarePayment,
            allowedRoles: [UserRoles.ADMIN]
        },
        {
            name: "Add new client",
            url: PAGES.dashboardAddNewClient,
            allowedRoles: [UserRoles.ADMIN, UserRoles.WORKER]
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
