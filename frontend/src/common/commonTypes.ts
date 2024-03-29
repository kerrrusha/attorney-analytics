import {Dispatch} from "react";

export type InputTarget = {
    target: HTMLInputElement;
}

export type LoggedInProps = {
    loggedIn: boolean;
    setLoggedIn: Dispatch<any>;
}

export type LanguageState = {
    language: string;
}

export type UserUpdateRequest = {
    userId: number,
    firstName?: string,
    lastName?: string,
    profilePhotoUrl?: string,
    bio?: string,
    linkedinUrl?: string,
    titleId?: number,
    emails?: Array<string>,
    phones?: Array<string>,
    locations?: Array<string>,
    admissions?: Array<string>,
    practiceAreas?: Array<string>,
}

export type User = {
    id: number,
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
    successfullyClosedAmount: number,
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

export type AddNewClientRequest = {
    firstName: string,
    lastName: string,
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

export type SelectOption = {
    value: string,
    label: string,
}

export type FireEmployeeRequest = {
    id: number,
}

export type IdValuePair = {
    id: number,
    value: number,
}

export type IdNamePair = {
    id: number,
    name: number,
}

export type DeclarePaymentRequest = {
    description: string,
    amountInCents: number,
    statusId: number,
    typeId: number,
    assignedLegalCaseId: number,
}
