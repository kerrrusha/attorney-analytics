import {useEffect, useState} from "react";
import {useAppDispatch} from "./useAppDispatch";
import {doGetRequestReturnJson} from "../services/doGetRequestReturnJson";
import {API_ENDPOINTS} from "../common/constants";
import {setLatestClosedCases} from "../redux/slices/analyticsSlice";

export default function useFetchLatestClosedCases() : [boolean] {
    const dispatch = useAppDispatch();
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        doGetRequestReturnJson(API_ENDPOINTS.getLatestClosedCases).then(result => {
            console.debug(`Fetched LatestClosedCases:`, result);

            dispatch(setLatestClosedCases(result));
            setFetched(true);
        });
    }, []);

    return [fetched];
}
