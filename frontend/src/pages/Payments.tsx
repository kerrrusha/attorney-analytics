import {LoggedInProps} from "../common/commonTypes";
import PageWithSidebar from "../components/sidebar/PageWithSidebar";

export default function Payments({loggedIn, setLoggedIn} : LoggedInProps) {
    const contentElement = <div>
        <table className="table background-secondary">
            <thead>
            <tr>
                <th scope="col">Date</th>
                <th scope="col"></th>
                <th scope="col">Description</th>
                <th scope="col">Assigned case</th>
                <th scope="col">Amount, $</th>
                <th scope="col">Status</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
            </tr>
            </tbody>
        </table>
    </div>;
    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"payments"} contentElement={contentElement} />;
}
