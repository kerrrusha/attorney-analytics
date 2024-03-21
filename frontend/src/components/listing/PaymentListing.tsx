import {PaymentsDataDto} from "../../common/commonTypes";
import {getPaymentStatusIcon} from "../../common/commonUtils";

interface PaymentCardProps {
    payments: Array<PaymentsDataDto>;
}

export default function PaymentListing({payments}: PaymentCardProps) {
    return (<table className="table background-secondary">
        <thead>
        <tr>
            <th scope="col">Last updated</th>
            <th scope="col">Type</th>
            <th scope="col">Amount, $</th>
            <th scope="col">Status</th>
            <th scope="col">Description</th>
            <th scope="col">Assigned case</th>
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
