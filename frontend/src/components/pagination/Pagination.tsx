import {createNumberList} from "../../common/commonUtils";
import PaginationButton from "./PaginationButton";

interface PaginationProps {
    pagesAmount: number;
    currentPage: number;
    onClickCallback: any;
}

export default function Pagination({pagesAmount, currentPage, onClickCallback}: PaginationProps) {
    return (<div className="flex flex-row flex-wrap">
        {createNumberList(pagesAmount).map(pageNumber =>
            <PaginationButton key={pageNumber} pageNumber={pageNumber} currentPage={currentPage} onClickCallback={onClickCallback} />)}
    </div>);
}