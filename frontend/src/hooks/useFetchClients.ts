import {useEffect, useState} from "react";
import {API_ENDPOINTS} from "../common/constants";
import {doGetRequestApiJsonWithParams} from "../services/doGetRequestApiJsonWithParams";
import {ClientsPageableDto} from "../common/commonTypes";

export default function useFetchClients(page: number, size: number) : [ClientsPageableDto | null, any] {
    const [result, setResult] = useState(null);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        doGetRequestApiJsonWithParams(API_ENDPOINTS.getClients, {page, size}).then(result => {
            setResult(result);
            setFetched(true);
        });
    }, [fetched]);

    return [result, setFetched];
}
