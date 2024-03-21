import {useEffect, useState} from "react";
import {API_ENDPOINTS} from "../common/constants";
import {doGetRequestReturnJson} from "../services/doGetRequestReturnJson";
import {TitleDto} from "../common/commonTypes";

export default function useFetchTitles() : [Array<TitleDto> | null, any] {
    const [result, setResult] = useState(null);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        doGetRequestReturnJson(API_ENDPOINTS.getTitles).then(result => {
            setResult(result);
            setFetched(true);
        });
    }, [fetched]);

    return [result, setFetched];
}
