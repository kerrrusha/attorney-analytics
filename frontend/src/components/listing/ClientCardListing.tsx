import {ClientsDataDto} from "../../common/commonTypes";
import {useTranslation} from "react-i18next";

interface ClientCardProps {
    clients: Array<ClientsDataDto>;
}

export default function ClientCardListing({clients}: ClientCardProps) {
    const { t } = useTranslation();

    return (<>
        {clients.map((client, index) =>
            <div key={index}
                 className="card background-secondary items-start justify-center no-underline pt-2 px-3 w-auto">
                <h5>{client.fullName}</h5>
                <div>
                    <span className="mr-3">{t("clients.total")}:</span>
                    <strong>{client.totalCases}</strong>
                </div>
                <div className="flex flex-col mt-2">
                    <div className="flex flex-col pl-2 border-start mb-3">
                        <span>{client.emails}</span>
                    </div>
                    <div className="flex flex-col pl-2 border-start mb-3">
                        <span>{client.phones}</span>
                    </div>
                </div>
            </div>)}
    </>);
}
