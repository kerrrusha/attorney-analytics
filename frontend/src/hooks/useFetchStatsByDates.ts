import {Dispatch, useEffect, useState} from "react";
import {useAppDispatch} from "./useAppDispatch";
import {doGetRequestWithParamsReturnJson} from "../services/doGetRequestWithParamsReturnJson";
import {API_ENDPOINTS} from "../common/constants";
import {setStatsByDates} from "../redux/slices/analyticsSlice";

export default function useFetchStatsByDates(dateFrom: string, dateTo: string) : [boolean, Dispatch<boolean>] {
    const dispatch = useAppDispatch();
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        doGetRequestWithParamsReturnJson(API_ENDPOINTS.getStatsByDates, {dateFrom, dateTo}).then(result => {
            console.log(`Fetched statsByDates:`, result);

            dispatch(setStatsByDates(result));
            setFetched(true);
        });
    }, [fetched]);

    return [fetched, setFetched];
}
