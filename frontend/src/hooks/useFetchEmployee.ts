import {useEffect, useState} from "react";
import {API_ENDPOINTS} from "../common/constants";
import {Employee} from "../common/commonTypes";
import {doGetRequestApiJson} from "../services/doGetRequestApiJson";

export default function useFetchEmployee(fullName: string) : [Employee | null, any] {
    const [result, setResult] = useState(null);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        doGetRequestApiJson(API_ENDPOINTS.getEmployee + "/" + fullName).then(result => {
            setResult(result);
            setFetched(true);
        });
    }, [fetched]);

    return [result, setFetched];
}
