export const MIN_VALUE_LENGTH = 3;

export const APPLICATION_NAME = "Attorney Analytics";

export const SUCCESS_COLOR_CLASSNAME = "text-success";
export const DANGER_COLOR_CLASSNAME = "text-danger";
export const NEUTRAL_COLOR_CLASS_NAME = "text-primary";

export const GOLDEN_TRANSPARENT_COLOR = "rgba(255, 219, 92, 0.22)";

export const BLANK_PERSON_PHOTO_URL = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";

export const PAGES = {
    analytics: "/analytics",
	dashboard: "/dashboard",
    payments: "/payments",
    employees: "/employees",
    clients: "/clients",
    cases: "/cases",
    login: "/login",
    register: "/register",
    profile: "/profile",
    dashboardHire: "/dashboard/hire",
    dashboardFire: "/dashboard/fire",
    dashboardEmployeeBonusSuggestions: "/dashboard/employee-bonus-suggestions",
    dashboardEmployeePromotionSuggestions: "/dashboard/employee-promotion-suggestions",
    dashboardPromoteEmployee: "/dashboard/promote-employee",
    dashboardDeclarePayment: "/dashboard/declare-payment",
    dashboardAddNewClient: "/dashboard/add-client",
}

export const API_ENDPOINTS = {
    getUserInfo: "/user/info",
    googleOAuthLogin: "/oauth/google/login",
    logout: "/auth/logout",
    isAuthorized: "/user/authorized",
    postUpdateUser: "/user/update",
    login: "/auth/login",
    register: "/auth/register",
    getAboutUs: "/analytics/about-us",
    getLatestClosedCases: "/analytics/latest-closed-cases",
    getAttorneysOfTheMonth: "/analytics/attorneys-of-the-month",
    getStatsByDates: "/analytics/stats-by-dates",
    getPayments: "/payments",
    getPaymentsStatuses: "/payments/statuses",
    getPaymentsTypes: "/payments/types",
    postDeclarePayment: "/payments/declare",
    getClients: "/clients",
    postAddClient: "/clients/new",
    getEmployeesGroupedByTitle: "/user/grouped-by-title",
    getEmployee: "/user",
    searchUserByLastName: "/user/search/lastName",
    getLegalCases: "/cases",
    searchLegalCaseByTitle: "/cases/search/title",
    getTitles: "/titles",
    postHireEmployee: "/user/hire",
    postFireEmployee: "/user/fire",
}

export const ROLES = {
    WORKER: "WORKER",
    ADMIN: "ADMIN",
}
