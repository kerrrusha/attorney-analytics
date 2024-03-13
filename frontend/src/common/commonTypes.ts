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
    login?: string,
    firstName?: string,
    lastName?: string,
    profilePhotoUrl?: string,
    bio?: string,
    linkedinUrl?: string,
    title?: Title,
    emails?: Array<Email>,
    phones?: Array<Phone>,
    locations?: Array<Location>,
    admissions?: Array<Admission>,
    practiceAreas?: Array<PracticeArea>,
    roles?: Array<Role>,
}

export type User = {
    id: string,
    login: string,
    firstName: string,
    lastName: string,
    profilePhotoUrl: string,
};

export type UserFull = {
    id: string,
    login: string,
    firstName: string,
    lastName: string,
    profilePhotoUrl: string,
    bio: string,
    linkedinUrl: string,
    title: Title,
    emails: Array<Email>,
    phones: Array<Phone>,
    locations: Array<Location>,
    admissions: Array<Admission>,
    practiceAreas: Array<PracticeArea>,
    roles: Array<Role>,
}

export type Title = {
    name: string,
}

export type Email = {
    value: string,
}

export type Phone = {
    value: string,
}

export type Admission = {
    value: string,
}

export type PracticeArea = {
    value: string,
}

export type Role = {
    name: string,
}

export type AuthState = {
    user: User | null,
    userFull: UserFull | null,
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
