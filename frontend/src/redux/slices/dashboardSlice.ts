import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AboutUsDto, AttorneysOfTheMonthDto, DashboardState, LatestClosedCasesDto, User} from "../../common/commonTypes";
import {RootState} from "../store";

const initialState: DashboardState = {
    aboutUs: null,
    latestClosedCases: null,
    attorneysOfTheMonth: null,
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setAboutUs: (state: DashboardState, action: PayloadAction<AboutUsDto>) => {
            state.aboutUs = action.payload;
        },
        setLatestClosedCases: (state: DashboardState, action: PayloadAction<LatestClosedCasesDto>) => {
            state.latestClosedCases = action.payload;
        },
        setAttorneysOfTheMonth: (state: DashboardState, action: PayloadAction<AttorneysOfTheMonthDto>) => {
            state.attorneysOfTheMonth = action.payload;
        },
    },
});

export const { setAboutUs, setLatestClosedCases, setAttorneysOfTheMonth } = dashboardSlice.actions;

export const selectAboutUs = (state: RootState) => state.dashboard.aboutUs;
export const selectLatestClosedCases = (state: RootState) => state.dashboard.latestClosedCases;
export const selectAttorneysOfTheMonth = (state: RootState) => state.dashboard.attorneysOfTheMonth;
