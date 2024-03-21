import {useEffect, useState} from "react";
import {useAppDispatch} from "./useAppDispatch";
import {setAboutUs} from "../redux/slices/analyticsSlice";
import {doGetRequestReturnJson} from "../services/doGetRequestReturnJson";
import {API_ENDPOINTS} from "../common/constants";

export default function useFetchAboutUs() : [boolean] {
    const dispatch = useAppDispatch();
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        doGetRequestReturnJson(API_ENDPOINTS.getAboutUs).then(result => {
            console.debug(`Fetched aboutUs: `, result);

            dispatch(setAboutUs(result));
            setFetched(true);
        });
    }, []);

    return [fetched];
}
