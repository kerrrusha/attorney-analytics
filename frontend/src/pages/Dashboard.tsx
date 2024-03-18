import {LoggedInProps, User, UserRoles} from "../common/commonTypes";
import PageWithSidebar from "../components/sidebar/PageWithSidebar";
import useFetchUser from "../hooks/useFetchUser";
import {useAppSelector} from "../hooks/useAppSelector";
import {selectUser} from "../redux/slices/authSlice";
import {haveIntersections} from "../common/commonUtils";

export default function Dashboard({loggedIn, setLoggedIn}: LoggedInProps) {
    const [userFetched] = useFetchUser();
    const user : User | null = useAppSelector(selectUser)!;

    const buttonsData = [
        {
            name: "Hire employee",
            url: "#",
            allowedRoles: [UserRoles.ADMIN]
        },
        {
            name: "Fire employee",
            url: "#",
            allowedRoles: [UserRoles.ADMIN]
        },
        {
            name: "Employee salary bonus suggestions",
            url: "#",
            allowedRoles: [UserRoles.ADMIN, UserRoles.WORKER]
        },
        {
            name: "Employee promotion suggestions",
            url: "#",
            allowedRoles: [UserRoles.ADMIN]
        },
        {
            name: "Promote employee",
            url: "#",
            allowedRoles: [UserRoles.ADMIN]
        },
        {
            name: "Declare a payment",
            url: "#",
            allowedRoles: [UserRoles.ADMIN]
        },
        {
            name: "Add new client",
            url: "#",
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
