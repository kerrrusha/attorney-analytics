import {LoggedInProps} from "../common/commonTypes";
import PageWithSidebar from "../components/sidebar/PageWithSidebar";
import {useState} from "react";
import LoadingGif from "../components/loading/LoadingGif";
import Pagination from "../components/pagination/Pagination";
import useFetchLegalCases from "../hooks/legal_case/useFetchLegalCases";
import {PAGES} from "../common/constants";
import {getStatusColorClass} from "../common/commonUtils";

export default function Cases({loggedIn, setLoggedIn} : LoggedInProps) {
    const START_PAGE = 0;
    const START_ELEMENT = 1;
    const PAGE_SIZE = 10;

    const [currentPageNumber, setCurrentPageNumber] = useState(START_PAGE);
    const [legalCases, setLegalCasesFetched] = useFetchLegalCases(currentPageNumber, PAGE_SIZE);
    const pagesAmount = legalCases && Math.ceil(legalCases.total / PAGE_SIZE);

    const getFrom = () => (currentPageNumber - START_PAGE) * PAGE_SIZE + START_ELEMENT;
    const getTo = () => {
        const to = (currentPageNumber - START_PAGE) * PAGE_SIZE + PAGE_SIZE;
        return to > legalCases!.total ? legalCases!.total : to;
    }

    const handlePageClick = (pageNumber: number) => {
        if (pageNumber === currentPageNumber || pageNumber < START_PAGE || pageNumber > pagesAmount!) {
            return;
        }
        setCurrentPageNumber(pageNumber);
        setLegalCasesFetched(false);
    };

    const contentElement = <div>
        {!legalCases ? <LoadingGif/> : <>
            <div className="text-sm flex flex-row">
                <span>Results</span>
                <span className="mx-1 font-bold">{getFrom()}-{getTo()}</span>
                <span>of</span>
                <span className="mx-1 font-bold">{legalCases.total}</span>
            </div>
            <hr className="mt-1"/>
            <table className="table background-secondary">
                <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Id</th>
                    <th scope="col">Updated at</th>
                    <th scope="col">Title</th>
                    <th scope="col">Status</th>
                    <th scope="col">Type</th>
                </tr>
                </thead>
                <tbody>
                {
                    legalCases.data.map((data, index) =>
                        <tr key={index}>
                            <td><a href={PAGES.cases + "/" + data.id}>View</a></td>
                            <td>#{data.id}</td>
                            <td>{data.updatedAt}</td>
                            <td>{data.title}</td>
                            <td className={getStatusColorClass(data.status)}>{data.status}</td>
                            <td>{data.type}</td>
                        </tr>)
                }
                </tbody>
            </table>
            <hr className="mb-2"/>
            <Pagination pagesAmount={pagesAmount!} currentPage={currentPageNumber} onClickCallback={handlePageClick}/>
        </>
        }
    </div>;
    return (<PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"cases"} contentElement={contentElement}/>);
}
