import {Dispatch} from "react";
import useFetchStatsByDates from "../hooks/useFetchStatsByDates";

export type InputTarget = {
    target: HTMLInputElement;
}

export type LoggedInProps = {
    loggedIn: boolean;
    setLoggedIn: Dispatch<any>;
}

export type UserUpdateRequest = {
    userId: string,
    firstName?: string,
    lastName?: string,
    profilePhotoUrl?: string,
    bio?: string,
    linkedinUrl?: string,
    title?: string,
    emails?: Array<string>,
    phones?: Array<string>,
    locations?: Array<string>,
    admissions?: Array<string>,
    practiceAreas?: Array<string>,
}

export type User = {
    id: string,
    login: string,
    firstName: string,
    lastName: string,
    profilePhotoUrl: string,
    bio: string,
    linkedinUrl: string,
    title: string,
    emails: Array<string>,
    phones: Array<string>,
    locations: Array<string>,
    admissions: Array<string>,
    practiceAreas: Array<string>,
    roles: Array<string>,
}

export type AuthState = {
    user: User | null,
}

export type LoginRequest = {
    login: string,
    password: string,
}

export type RegisterRequest = {
    firstName: string,
    lastName: string,
    login: string,
    password: string,
}

export type KeyValueData = {
    key: string,
    value: number,
}

export type AboutUsDto = {
    workers: number,
    clients: number,
    caseStatusToAmount: Record<string, number>
}

export type DashboardState = {
    aboutUs: AboutUsDto | null,
    latestClosedCases: LatestClosedCasesDto | null,
    attorneysOfTheMonth: AttorneysOfTheMonthDto | null,
    statsByDates: StatsByDatesDto | null,
}

export type LatestClosedCasesDto = Array<{
    closedDate: string,
    title: string,
    status: string,
    clients: string,
    assignedAttorneys: string,
}>

export type AttorneysOfTheMonthDto = Array<{
    attorneyFullName: string,
    title: string,
    casesParticipated: number,
    successfullyClosedRate: number,
}>

export type StatsByDatesDto = {
    caseTypeIncomesOutcomes: IncomesOutcomes,
    clientIncomesOutcomes: IncomesOutcomes,
    monthIncomesOutcomes: IncomesOutcomes,
}

export type IncomesOutcomes = {
    incomes: Array<KeyValueData>,
    outcomes: Array<KeyValueData>,
}
