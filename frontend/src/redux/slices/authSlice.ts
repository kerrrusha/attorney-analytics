import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState, User, UserFull} from "../../common/commonTypes";
import {RootState} from "../store";

const initialState: AuthState = {
    user: null,
    userFull: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state: AuthState, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        setUserFull: (state: AuthState, action: PayloadAction<UserFull>) => {
            state.userFull = action.payload;
        }
    },
});

export const { setUser, setUserFull } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectUserFull = (state: RootState) => state.auth.userFull;
