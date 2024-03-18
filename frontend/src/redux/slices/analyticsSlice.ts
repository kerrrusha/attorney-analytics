import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    AboutUsDto,
    AttorneysOfTheMonthDto,
    AnalyticsState,
    LatestClosedCasesDto,
    StatsByDatesDto
} from "../../common/commonTypes";
import {RootState} from "../store";

const initialState: AnalyticsState = {
    aboutUs: null,
    latestClosedCases: null,
    attorneysOfTheMonth: null,
    statsByDates: null,
};

export const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        setAboutUs: (state: AnalyticsState, action: PayloadAction<AboutUsDto>) => {
            state.aboutUs = action.payload;
        },
        setLatestClosedCases: (state: AnalyticsState, action: PayloadAction<LatestClosedCasesDto>) => {
            state.latestClosedCases = action.payload;
        },
        setAttorneysOfTheMonth: (state: AnalyticsState, action: PayloadAction<AttorneysOfTheMonthDto>) => {
            state.attorneysOfTheMonth = action.payload;
        },
        setStatsByDates: (state: AnalyticsState, action: PayloadAction<StatsByDatesDto>) => {
            state.statsByDates = action.payload;
        },
    },
});

export const { setAboutUs, setLatestClosedCases, setAttorneysOfTheMonth, setStatsByDates } = analyticsSlice.actions;

export const selectAboutUs = (state: RootState) => state.analytics.aboutUs;
export const selectLatestClosedCases = (state: RootState) => state.analytics.latestClosedCases;
export const selectAttorneysOfTheMonth = (state: RootState) => state.analytics.attorneysOfTheMonth;
export const selectStatsByDates = (state: RootState) => state.analytics.statsByDates;
