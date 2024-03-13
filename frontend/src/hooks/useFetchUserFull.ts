import {useAppDispatch} from "./useAppDispatch";
import {useEffect, useState} from "react";
import {fetchUserInfoFull} from "../services/fetchUserInfoFull";
import {setUserFull} from "../redux/slices/authSlice";

export default function useFetchUserFull() : [boolean] {
    const dispatch = useAppDispatch();
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        fetchUserInfoFull().then(user => {
            console.log(`Fetched user:`);
            console.log(user);

            dispatch(setUserFull(user));
            setFetched(true);
        });
    }, []);

    return [fetched];
}
