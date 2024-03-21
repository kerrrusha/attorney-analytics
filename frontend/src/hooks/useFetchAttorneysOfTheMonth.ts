import {useEffect, useState} from "react";
import {useAppDispatch} from "./useAppDispatch";
import {doGetRequestReturnJson} from "../services/doGetRequestReturnJson";
import {API_ENDPOINTS} from "../common/constants";
import {setAttorneysOfTheMonth} from "../redux/slices/analyticsSlice";

export default function useFetchAttorneysOfTheMonth() : [boolean] {
    const dispatch = useAppDispatch();
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        doGetRequestReturnJson(API_ENDPOINTS.getAttorneysOfTheMonth).then(result => {
            console.debug(`Fetched AttorneysOfTheMonth:`, result);

            dispatch(setAttorneysOfTheMonth(result));
            setFetched(true);
        });
    }, []);

    return [fetched];
}
