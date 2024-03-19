import {LoggedInProps} from "../../common/commonTypes";
import PageWithSidebar from "../../components/sidebar/PageWithSidebar";
import {useParams} from "react-router-dom";
import useFetchLegalCase from "../../hooks/useFetchLegalCase";
import LoadingGif from "../../components/loading/LoadingGif";

export default function LegalCase({loggedIn, setLoggedIn}: LoggedInProps) {
    const { caseId } = useParams();
    const [legalCase] = useFetchLegalCase(caseId!);

    const contentElement = <div>
        {caseId}
        {!legalCase ? <LoadingGif /> : <span>{legalCase.title}</span>}
    </div>;
    return <PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={"cases"} contentElement={contentElement}/>;
}