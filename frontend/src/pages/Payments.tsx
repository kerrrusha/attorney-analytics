import {LoggedInProps} from "../common/commonTypes";
import PageWithSidebar from "../components/sidebar/PageWithSidebar";
import LoadingGif from "../components/loading/LoadingGif";
import Pagination from "../components/pagination/Pagination";
import useFetchPayments from "../hooks/payment/useFetchPayments";
import {useState} from "react";
import PaymentListing from "../components/listing/PaymentListing";
import {useTranslation} from "react-i18next";

export default function Payments({loggedIn, setLoggedIn}: LoggedInProps) {
    const START_PAGE = 0;
    const START_ELEMENT = 1;
    const PAGE_SIZE = 10;

    const [currentPageNumber, setCurrentPageNumber] = useState(START_PAGE);
    const [payments, setPaymentsFetched] = useFetchPayments(currentPageNumber, PAGE_SIZE);
    const pagesAmount = payments && Math.ceil(payments.total / PAGE_SIZE);
    const { t } = useTranslation();

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
            <PaymentListing payments={payments.data} />
            <hr className="mb-2"/>
            <Pagination pagesAmount={pagesAmount!} currentPage={currentPageNumber} onClickCallback={handlePageClick}/>
        </>
        }
    </div>;
    return (<PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={t("payments.name")} contentElement={contentElement}/>);
}
