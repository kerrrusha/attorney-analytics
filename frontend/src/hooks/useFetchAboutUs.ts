import {useEffect, useState} from "react";
import {useAppDispatch} from "./useAppDispatch";
import {fetchAboutUs} from "../services/fetchAboutUs";
import {setAboutUs} from "../redux/slices/dashboardSlice";

export default function useFetchAboutUs() : [boolean] {
    const dispatch = useAppDispatch();
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        fetchAboutUs().then(result => {
            console.log(`Fetched aboutUs:`);
            console.log(result);

            dispatch(setAboutUs(result));
            setFetched(true);
        });
    }, []);

    return [fetched];
}
