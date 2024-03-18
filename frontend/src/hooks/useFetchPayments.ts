import {useEffect, useState} from "react";
import {API_ENDPOINTS} from "../common/constants";
import {PaymentsPageableDto} from "../common/commonTypes";
import {doGetRequestApiJsonWithParams} from "../services/doGetRequestApiJsonWithParams";

export default function useFetchPayments(page: number, size: number) : [PaymentsPageableDto | null, any] {
    const [result, setResult] = useState(null);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        doGetRequestApiJsonWithParams(API_ENDPOINTS.getPayments, {page, size}).then(result => {
            setResult(result);
            setFetched(true);
        });
    }, [fetched]);

    return [result, setFetched];
}
