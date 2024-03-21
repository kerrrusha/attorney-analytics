import {useEffect, useState} from "react";
import {setUser} from "../redux/slices/authSlice";
import {useAppDispatch} from "./useAppDispatch";
import {doGetRequestReturnJson} from "../services/doGetRequestReturnJson";
import {API_ENDPOINTS} from "../common/constants";

export default function useFetchUser() : [boolean] {
    const dispatch = useAppDispatch();
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        doGetRequestReturnJson(API_ENDPOINTS.getUserInfo).then(user => {
            console.debug(`Fetched user: `, user);

            dispatch(setUser(user));
            setFetched(true);
        });
    }, []);

    return [fetched];
}
