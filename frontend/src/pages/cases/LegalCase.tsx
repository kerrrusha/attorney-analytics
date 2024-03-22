import {LoggedInProps} from "../../common/commonTypes";
import PageWithSidebar from "../../components/sidebar/PageWithSidebar";
import {useParams} from "react-router-dom";
import useFetchLegalCase from "../../hooks/legal_case/useFetchLegalCase";
import LoadingGif from "../../components/loading/LoadingGif";
import {getStatusColorClass} from "../../common/commonUtils";
import EmployeeCardListing from "../../components/listing/EmployeeCardListing";
import ClientCardListing from "../../components/listing/ClientCardListing";
import PaymentListing from "../../components/listing/PaymentListing";
import {useTranslation} from "react-i18next";

export default function LegalCase({loggedIn, setLoggedIn}: LoggedInProps) {
    const { caseId } = useParams();
    const [legalCase] = useFetchLegalCase(caseId!);
    const { t } = useTranslation();

    const contentElement = <div>
        {!legalCase ? <LoadingGif /> : <div className="px-3 py-2 flex flex-row mx-auto">
            <div className="flex flex-col flex-1 pr-5">
                <span className="display-4">{legalCase.title + " #" + legalCase.id}</span>
                <span className="font-bold">{legalCase.description}</span>
                <h4 className={"mt-3 " + getStatusColorClass(legalCase.status)}>{legalCase.status}</h4>
                <table id="case-info">
                    <tbody>
                    <tr>
                        <th>{t("cases.type")}:</th>
                        <td>{legalCase.type}</td>
                    </tr>
                    <tr>
                        <th>{t("cases.updated")}:</th>
                        <td>{legalCase.updatedAt}</td>
                    </tr>
                    <tr>
                        <th>{t("cases.created")}:</th>
                        <td>{legalCase.createdAt}</td>
                    </tr>
                    </tbody>
                </table>
                <hr />
                <span className="display-6">{t("cases.assClients")}</span>
                <div className="flex flex-row flex-wrap mt-3">
                    <ClientCardListing clients={legalCase.assignedClients} />
                </div>
                <hr />
                <span className="display-6">{t("cases.assAttys")}</span>
                <div className="flex flex-row flex-wrap mt-3">
                    <EmployeeCardListing employees={legalCase.assignedAttorneys} />
                </div>
                <hr />
                <span className="display-6">{t("cases.assPayments")}</span>
                <div className="flex flex-row flex-wrap mt-3">
                    <PaymentListing payments={legalCase.assignedPayments} />
                </div>
            </div>
        </div>}
    </div>;
    return (<PageWithSidebar loggedIn={loggedIn} setLoggedIn={setLoggedIn}
                            pageName={t("cases.name")} contentElement={contentElement}/>);
}