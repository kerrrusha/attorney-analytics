interface PaginationButtonProps {
    pageNumber: number;
    currentPage: number;
    onClickCallback: any;
}

export default function PaginationButton({pageNumber, currentPage, onClickCallback}: PaginationButtonProps) {
    return <button onClick={() => onClickCallback(pageNumber)}
                   className={"px-3 py-2 m-1 font-bold text-xl btn background-secondary"
                       + (pageNumber === currentPage ? " text-decoration-underline " : "")}>
        {pageNumber+1}
    </button>;
}