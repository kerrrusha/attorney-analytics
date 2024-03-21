import {useEffect, useState} from "react";
import {API_ENDPOINTS} from "../../common/constants";
import {LegalCasePageableDto} from "../../common/commonTypes";
import {doGetRequestWithParamsReturnJson} from "../../services/doGetRequestWithParamsReturnJson";

export default function useFetchLegalCases(page: number, size: number) : [LegalCasePageableDto | null, any] {
    const [result, setResult] = useState(null);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        doGetRequestWithParamsReturnJson(API_ENDPOINTS.getLegalCases, {page, size}).then(result => {
            setResult(result);
            setFetched(true);
        });
    }, [fetched]);

    return [result, setFetched];
}
