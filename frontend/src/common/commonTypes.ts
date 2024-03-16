import {Dispatch} from "react";

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

export type KeyValueChartData = {
    key: string,
    value: number,
}

export type AboutUs = {
    workers: number,
    clients: number,
    cases: any
}

export type DashboardState = {
    aboutUs: AboutUs | null,
}
