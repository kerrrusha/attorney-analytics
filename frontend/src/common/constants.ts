export const MIN_VALUE_LENGTH = 3;

export const APPLICATION_NAME = "Attorney Analytics";

export const PAGES = {
    analytics: '/analytics',
	dashboard: '/dashboard',
    payments: '/payments',
    workers: '/workers',
    clients: '/clients',
    cases: '/cases',
    login: '/login',
    register: '/register',
    profile: '/profile',
}

export const API_ENDPOINTS = {
    getUserInfo: '/user/info',
    googleOAuthLogin: '/oauth/google/login',
    logout: '/auth/logout',
    isAuthorized: '/user/authorized',
    postUpdateUser: '/user/update',
    login: '/auth/login',
    register: '/auth/register',
    getAboutUs: '/analytics/about-us',
    getLatestClosedCases: '/analytics/latest-closed-cases',
    getAttorneysOfTheMonth: '/analytics/attorneys-of-the-month',
    getStatsByDates: '/analytics/stats-by-dates',
}
