import {useEffect, useState} from "react";
import {API_ENDPOINTS} from "../common/constants";
import {PaymentsPageableDto} from "../common/commonTypes";
import {doGetRequestWithParamsReturnJson} from "../services/doGetRequestWithParamsReturnJson";

export default function useFetchPayments(page: number, size: number) : [PaymentsPageableDto | null, any] {
    const [result, setResult] = useState(null);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        doGetRequestWithParamsReturnJson(API_ENDPOINTS.getPayments, {page, size}).then(result => {
            setResult(result);
            setFetched(true);
        });
    }, [fetched]);

    return [result, setFetched];
}
