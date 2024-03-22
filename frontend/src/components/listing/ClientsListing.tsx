import {ClientsDataDto} from "../../common/commonTypes";
import {useTranslation} from "react-i18next";

interface ClientsListingProps {
    clients: ClientsDataDto[];
}

export default function ClientsListing({clients}: ClientsListingProps) {
    const { t } = useTranslation();

    return (
        <table className="table background-secondary">
            <thead>
            <tr>
                <th scope="col">{t("clients.withUs")}</th>
                <th scope="col">{t("clients.client")}</th>
                <th scope="col">{t("clients.total")}</th>
                <th scope="col">{t("clients.emails")}</th>
                <th scope="col">{t("clients.phones")}</th>
            </tr>
            </thead>
            <tbody>
            {
                clients.map((data, index) =>
                    <tr key={index}>
                        <td>{data.createdAt}</td>
                        <td>{data.fullName}</td>
                        <th>{data.totalCases}</th>
                        <td>{data.emails}</td>
                        <td>{data.phones}</td>
                    </tr>)
            }
            </tbody>
        </table>
    );
}