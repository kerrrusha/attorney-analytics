import {LoggedInProps} from "../common/commonTypes";
import PageWithSidebar from "../components/sidebar/PageWithSidebar";
import LoadingGif from "../components/loading/LoadingGif";
import Pagination from "../components/pagination/Pagination";
import useFetchPayments from "../hooks/useFetchPayments";
import {useState} from "react";

export default function Payments({loggedIn, setLoggedIn}: LoggedInProps) {
    const START_PAGE = 0;
    const START_ELEMENT = 1;
    const PAGE_SIZE = 10;

    const [currentPageNumber, setCurrentPageNumber] = useState(START_PAGE);
    const [payments, setPaymentsFetched] = useFetchPayments(currentPageNumber, PAGE_SIZE);
    const pagesAmount = payments && Math.ceil(payments.total / PAGE_SIZE);

    const getPaymentStatusIcon = (type: string) => {
        const logoUrl = type === "INCOME"
            ? "https://cdn-icons-png.flaticon.com/512/4721/4721635.png "
            : "https://cdn-icons-png.flaticon.com/512/4721/4721643.png";
        return <img src={logoUrl} alt="" width={25}></img>;
    };

    const getFrom = () => (currentPageNumber - START_PAGE) * PAGE_SIZE + START_ELEMENT;
    const getTo = () => {
        const to = (currentPageNumber - START_PAGE) * PAGE_SIZE + PAGE_SIZE;
        return to > payments!.total ? payments!.total : to;
    }

    const handlePageClick = (pageNumber: number) => {
        if (pageNumber === currentPageNumber || pageNumber < START_PAGE || pageNumber > pagesAmount!) {
            return;
        }
        setCurrentPageNumber(pageNumber);
        setPaymentsFetched(false);
    };

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
                    <th scope="col">Last updated</th>
                    <th scope="col">Type</th>
                    <th scope="col">Amount, $</th>
                    <th scope="col">Status</th>
                    <th scope="col">Description</th>
                    <th scope="col">Assigned case</th>
                </tr>
                </thead>
                <tbody>
                {
                    payments.data.map((data, index) =>
                        <tr key={index}>
                            <td>{data.updatedAt}</td>
                            <td>{getPaymentStatusIcon(data.type)}</td>
                            <th>{data.amount}.00</th>
                            <td>{data.status}</td>
                            <td>{data.description}</td>
                            <td>{data.assignedCase}</td>
                        </tr>)
                }
                </tbody>
            </table>
            <hr className="mb-2"/>
            <Pagination pagesAmount={pagesAmount!} currentPage={currentPageNumber} onClickCallback={handlePageClick}/>
        </>
        }
    </div>;
    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"payments"} contentElement={contentElement}/>;
}
