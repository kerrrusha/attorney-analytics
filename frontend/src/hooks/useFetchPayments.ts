import {useEffect, useState} from "react";
import {doGetRequestApiJson} from "../services/doGetRequestApiJson";
import {API_ENDPOINTS} from "../common/constants";
import {PaymentsPageableDto} from "../common/commonTypes";

export default function useFetchPayments() : [PaymentsPageableDto | null] {
    const [result, setResult] = useState(null);

    useEffect(() => {
        doGetRequestApiJson(API_ENDPOINTS.getPayments).then(result => {
            setResult(result);
        });
    }, []);

    return [result];
}
