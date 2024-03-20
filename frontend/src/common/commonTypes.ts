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

export type EmployeeDto = {
    createdAt: string,
    fullName: string,
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

export type HireEmployeeRequest = {
    firstName: string,
    lastName: string,
    login: string,
    titleId: number,
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

export type AnalyticsState = {
    aboutUs: AboutUsDto | null,
    latestClosedCases: LatestClosedCasesDto | null,
    attorneysOfTheMonth: AttorneysOfTheMonthDto | null,
    statsByDates: StatsByDatesDto | null,
}

export type LatestClosedCasesDto = Array<{
    closedDate: string,
    title: string,
    status: string,
    profit: number,
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

export type PaymentsDataDto = {
    updatedAt: string,
    type: string,
    description: string,
    assignedCase: string,
    amount: number,
    status: string,
}

export type PaymentsPageableDto = {
    total: number,
    data: Array<PaymentsDataDto>
}

export type ClientsDataDto = {
    createdAt: string,
    fullName: string,
    totalCases: number,
    emails: string,
    phones: string,
}

export type ClientsPageableDto = {
    total: number,
    data: Array<ClientsDataDto>
}

export type EmployeeListingDto = {
    profilePhotoUrl: string,
    fullName: string,
    title: string,
    emails: Array<string>,
    phones: Array<string>,
}

export type EmployeesGroupedByTitleDto = Array<{
    title: string,
    data: Array<EmployeeListingDto>
}>

export type LegalCasePageableDto = {
    total: number,
    data: Array<LegalCaseDto>
}

export type LegalCaseDto = {
    id: number,
    createdAt: string,
    updatedAt: string,
    title: string,
    description: string,
    assignedClients: Array<ClientsDataDto>,
    assignedAttorneys: Array<EmployeeDto>,
    assignedPayments: Array<PaymentsDataDto>,
    status: string,
    type: string,
}

export type TitleDto = {
    id: number,
    name: string,
}

export type SelectOption = {
    value: string,
    label: string,
}

export type FireEmployeeRequest = {
    id: number,
}
