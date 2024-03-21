import {useEffect, useState} from "react";
import {API_ENDPOINTS} from "../../common/constants";
import {IdNamePair} from "../../common/commonTypes";
import {doGetRequestReturnJson} from "../../services/doGetRequestReturnJson";

export default function useFetchPaymentTypes() : [IdNamePair[] | null, any] {
    const [result, setResult] = useState(null);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        doGetRequestReturnJson(API_ENDPOINTS.getPaymentsTypes).then(result => {
            setResult(result);
            setFetched(true);
        });
    }, [fetched]);

    return [result, setFetched];
}
