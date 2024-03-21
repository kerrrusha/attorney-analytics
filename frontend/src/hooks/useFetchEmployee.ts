import {useEffect, useState} from "react";
import {API_ENDPOINTS} from "../common/constants";
import {EmployeeDto} from "../common/commonTypes";
import {doGetRequestReturnJson} from "../services/doGetRequestReturnJson";

export default function useFetchEmployee(fullName: string) : [EmployeeDto | null, any] {
    const [result, setResult] = useState(null);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        doGetRequestReturnJson(API_ENDPOINTS.getEmployee + "/" + fullName).then(result => {
            setResult(result);
            setFetched(true);
        });
    }, [fetched]);

    return [result, setFetched];
}
