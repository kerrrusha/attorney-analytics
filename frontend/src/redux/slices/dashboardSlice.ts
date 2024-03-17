import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    AboutUsDto,
    AttorneysOfTheMonthDto,
    DashboardState,
    LatestClosedCasesDto,
    StatsByDatesDto
} from "../../common/commonTypes";
import {RootState} from "../store";
import useFetchStatsByDates from "../../hooks/useFetchStatsByDates";

const initialState: DashboardState = {
    aboutUs: null,
    latestClosedCases: null,
    attorneysOfTheMonth: null,
    statsByDates: null,
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
        setStatsByDates: (state: DashboardState, action: PayloadAction<StatsByDatesDto>) => {
            state.statsByDates = action.payload;
        },
    },
});

export const { setAboutUs, setLatestClosedCases, setAttorneysOfTheMonth, setStatsByDates } = dashboardSlice.actions;

export const selectAboutUs = (state: RootState) => state.dashboard.aboutUs;
export const selectLatestClosedCases = (state: RootState) => state.dashboard.latestClosedCases;
export const selectAttorneysOfTheMonth = (state: RootState) => state.dashboard.attorneysOfTheMonth;
export const selectStatsByDates = (state: RootState) => state.dashboard.statsByDates;
