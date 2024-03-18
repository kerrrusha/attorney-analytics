import {LoggedInProps} from "../common/commonTypes";
import PageWithSidebar from "../components/sidebar/PageWithSidebar";
import LoadingGif from "../components/loading/LoadingGif";
import Pagination from "../components/pagination/Pagination";

export default function Payments({loggedIn, setLoggedIn}: LoggedInProps) {
    const payments = {
        total: 34,
        data: [
            {
                date: "18.03.2024",
                type: "INCOME",
                description: "Initial consultation fee",
                assignedCase: "Personal Injury Case #324",
                amount: 320,
                status: "SUCCESS",

            },
            {
                date: "14.03.2024",
                type: "OUTCOME",
                description: "Initial consultation fee",
                assignedCase: "Personal Injury Case #52",
                amount: 510,
                status: "SUCCESS",
            },
        ]
    };

    const getPaymentStatusIcon = (type: string) => {
        const logoUrl = type === "INCOME"
            ? "https://cdn-icons-png.flaticon.com/512/4721/4721635.png "
            : "https://cdn-icons-png.flaticon.com/512/4721/4721643.png";
        return <img src={logoUrl} alt="" width={25}></img>;
    };

    const START_PAGE = 1;
    const START_ELEMENT = 1;
    const pageable = {
        page: 1,
        size: 10,
    };
    const pagesAmount = payments && Math.ceil(payments.total / pageable.size);

    const getFrom = () => (pageable.page - START_PAGE) * pageable.size + START_ELEMENT;
    const getTo = () => (pageable.page - START_PAGE) * pageable.size + pageable.size;

    const handlePageClick = (pageNumber: number) => console.log(pageNumber);

    const contentElement = <div>
        {!payments ? <LoadingGif/> : <>
            <div className="text-sm flex flex-row">
                <span>Results</span>
                <span className="mx-1 font-bold">{getFrom()}-{getTo()}</span>
                <span>of</span>
                <span className="mx-1 font-bold">{payments.total}</span>
            </div>
            <hr className="mt-1"/>
            <table className="table background-secondary">
                <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Type</th>
                    <th scope="col">Description</th>
                    <th scope="col">Assigned case</th>
                    <th scope="col">Amount, $</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                {
                    payments.data.map((data, index) =>
                        <tr key={index}>
                            <th scope="row">{data.date}</th>
                            <td>{getPaymentStatusIcon(data.type)}</td>
                            <td>{data.description}</td>
                            <td>{data.assignedCase}</td>
                            <td>{data.amount}.00</td>
                            <td>{data.status}</td>
                        </tr>)
                }
                </tbody>
            </table>
            <hr className="mb-2"/>
            <Pagination pagesAmount={pagesAmount} currentPage={pageable.page} onClickCallback={handlePageClick}/>
        </>
        }
    </div>;
    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"payments"} contentElement={contentElement}/>;
}
