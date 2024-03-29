import {LoggedInProps} from "../common/commonTypes";
import PageWithSidebar from "../components/sidebar/PageWithSidebar";
import {useState} from "react";
import LoadingGif from "../components/loading/LoadingGif";
import Pagination from "../components/pagination/Pagination";
import useFetchClients from "../hooks/useFetchClients";
import {useTranslation} from "react-i18next";
import ClientsListing from "../components/listing/ClientsListing";

export default function Clients({loggedIn, setLoggedIn} : LoggedInProps) {
    const START_PAGE = 0;
    const START_ELEMENT = 1;
    const PAGE_SIZE = 10;

    const [currentPageNumber, setCurrentPageNumber] = useState(START_PAGE);
    const [clients, setClientsFetched] = useFetchClients(currentPageNumber, PAGE_SIZE);
    const pagesAmount = clients && Math.ceil(clients.total / PAGE_SIZE);
    const { t } = useTranslation();

    const getFrom = () => (currentPageNumber - START_PAGE) * PAGE_SIZE + START_ELEMENT;
    const getTo = () => {
        const to = (currentPageNumber - START_PAGE) * PAGE_SIZE + PAGE_SIZE;
        return to > clients!.total ? clients!.total : to;
    }

    const handlePageClick = (pageNumber: number) => {
        if (pageNumber === currentPageNumber || pageNumber < START_PAGE || pageNumber > pagesAmount!) {
            return;
        }
        setCurrentPageNumber(pageNumber);
        setClientsFetched(false);
    };

    const contentElement = <div>
        {!clients ? <LoadingGif/> : <>
            <div className="text-sm flex flex-row">
                <span>{t("common.results")}</span>
                <span className="mx-1 font-bold">{getFrom()}-{getTo()}</span>
                <span>{t("common.of")}</span>
                <span className="mx-1 font-bold">{clients.total}</span>
            </div>
            <hr className="mt-1"/>
            <ClientsListing clients={clients.data} />
            <hr className="mb-2"/>
            <Pagination pagesAmount={pagesAmount!} currentPage={currentPageNumber}
                        onClickCallback={handlePageClick}/>
        </>
        }
    </div>;
    return (<PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={t("clients.name")} contentElement={contentElement}/>);
}
