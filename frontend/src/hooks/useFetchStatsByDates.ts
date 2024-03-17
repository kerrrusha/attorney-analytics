import {useEffect, useState} from "react";
import {useAppDispatch} from "./useAppDispatch";
import {doGetRequestApiJsonWithParams} from "../services/doGetRequestApiJsonWithParams";
import {API_ENDPOINTS} from "../common/constants";
import {setStatsByDates} from "../redux/slices/dashboardSlice";

export default function useFetchStatsByDates(dateFrom: string, dateTo: string) : [boolean] {
    const dispatch = useAppDispatch();
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        doGetRequestApiJsonWithParams(API_ENDPOINTS.getLatestClosedCases, {dateFrom, dateTo}).then(result => {
            console.log(`Fetched statsByDates:`);
            console.log(result);

            dispatch(setStatsByDates(result));
            setFetched(true);
        });
    }, []);

    return [fetched];
}
