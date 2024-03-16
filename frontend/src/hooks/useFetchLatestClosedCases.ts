import {useEffect, useState} from "react";
import {useAppDispatch} from "./useAppDispatch";
import {doGetRequestApiJson} from "../services/doGetRequestApiJson";
import {API_ENDPOINTS} from "../common/constants";
import {setLatestClosedCases} from "../redux/slices/dashboardSlice";

export default function useFetchLatestClosedCases() : [boolean] {
    const dispatch = useAppDispatch();
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        doGetRequestApiJson(API_ENDPOINTS.getLatestClosedCases).then(result => {
            console.log(`Fetched LatestClosedCases:`);
            console.log(result);

            dispatch(setLatestClosedCases(result));
            setFetched(true);
        });
    }, []);

    return [fetched];
}
