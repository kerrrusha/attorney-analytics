import {PaymentsDataDto} from "../../common/commonTypes";
import {getPaymentStatusIcon} from "../../common/commonUtils";
import {useTranslation} from "react-i18next";

interface PaymentCardProps {
    payments: Array<PaymentsDataDto>;
}

export default function PaymentListing({payments}: PaymentCardProps) {
    const { t } = useTranslation();

    return (<table className="table background-secondary">
        <thead>
        <tr>
            <th scope="col">{t("payments.lastUpd")}</th>
            <th scope="col">{t("payments.type")}</th>
            <th scope="col">{t("payments.amount")}, $</th>
            <th scope="col">{t("payments.status")}</th>
            <th scope="col">{t("payments.description")}</th>
            <th scope="col">{t("payments.assCase")}</th>
        </tr>
        </thead>
        <tbody>
        {
            payments.map((data, index) =>
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
    </table>);
}
