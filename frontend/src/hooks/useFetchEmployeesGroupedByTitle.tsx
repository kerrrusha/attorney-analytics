import {useEffect, useState} from "react";
import {API_ENDPOINTS} from "../common/constants";
import {doGetRequestApiJson} from "../services/doGetRequestApiJson";
import {EmployeesGroupedByTitleDto} from "../common/commonTypes";

export default function useFetchEmployeesGroupedByTitle() : [EmployeesGroupedByTitleDto | null, any] {
    const [result, setResult] = useState(null);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        doGetRequestApiJson(API_ENDPOINTS.getEmployeesGroupedByTitle).then(result => {
            setResult(result);
            setFetched(true);
        });
    }, [fetched]);

    return [result, setFetched];
}
