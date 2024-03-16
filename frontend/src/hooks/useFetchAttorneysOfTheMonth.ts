import {useEffect, useState} from "react";
import {useAppDispatch} from "./useAppDispatch";
import {doGetRequestApiJson} from "../services/doGetRequestApiJson";
import {API_ENDPOINTS} from "../common/constants";
import {setAttorneysOfTheMonth} from "../redux/slices/dashboardSlice";

export default function useFetchAttorneysOfTheMonth() : [boolean] {
    const dispatch = useAppDispatch();
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        doGetRequestApiJson(API_ENDPOINTS.getAttorneysOfTheMonth).then(result => {
            console.log(`Fetched AttorneysOfTheMonth:`);
            console.log(result);

            dispatch(setAttorneysOfTheMonth(result));
            setFetched(true);
        });
    }, []);

    return [fetched];
}
