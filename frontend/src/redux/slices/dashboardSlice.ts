import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AboutUs, AuthState, DashboardState, User} from "../../common/commonTypes";
import {RootState} from "../store";

const initialState: DashboardState = {
    aboutUs: null,
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setAboutUs: (state: DashboardState, action: PayloadAction<AboutUs>) => {
            state.aboutUs = action.payload;
        },
    },
});

export const { setAboutUs } = dashboardSlice.actions;

export const selectAboutUs = (state: RootState) => state.dashboard.aboutUs;
