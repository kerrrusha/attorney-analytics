import {useEffect, useState} from "react";
import {API_ENDPOINTS} from "../common/constants";
import {LegalCaseDto} from "../common/commonTypes";
import {doGetRequestReturnJson} from "../services/doGetRequestReturnJson";

export default function useFetchLegalCase(caseId: string) : [LegalCaseDto | null, any] {
    const [result, setResult] = useState(null);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        doGetRequestReturnJson(API_ENDPOINTS.getLegalCases + "/" + caseId).then(result => {
            setResult(result);
            setFetched(true);
        });
    }, [fetched]);

    return [result, setFetched];
}
