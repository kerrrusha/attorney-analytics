import React, {FormEvent, useEffect, useState} from 'react';
import DarkModeSwitch from "../components/DarkModeSwitch";
import {InputTarget, LoggedInProps, RegisterRequest} from "../common/commonTypes";
import GoogleLogin from "../components/GoogleLogin";
import {onGoogleSignIn} from "../services/onGoogleSignIn";
import {useNavigate} from "react-router-dom";
import {APPLICATION_NAME, PAGES} from "../common/constants";
import goodman from '../resources/img/goodman.png';
import {register} from "../services/register";
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitch";

export default function Register({loggedIn, setLoggedIn} : LoggedInProps) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        if (loggedIn) {
            navigate(PAGES.analytics);
        }
    }, [loggedIn]);

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const requestBody : RegisterRequest = {
            login: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
        }

        register(requestBody).then(response => {
            console.log(`Register status: ${response.status}`);

            if (response.status === 200) {
                setError('');
                setLoggedIn(true);
            } else {
                setError(response.body.message);
            }
        });
    }

    return (
        <div className="background-primary">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-20 w-auto"
                        src={goodman}
                        alt=""
                    />
                    <h4 className="mt-2 text-center display-4 tracking-tight">
                        {APPLICATION_NAME}
                    </h4>
                    <h2 className="mt-16 text-center text-2xl font-bold leading-9 tracking-tight">
                        {t("auth.createAccount")}
                    </h2>
                </div>

                <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6">
                                    {t("auth.firstName")}
                                </label>
                                <input
                                    required
                                    minLength={3}
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    value={firstName}
                                    onChange={({target} : InputTarget) => setFirstName(target.value)}
                                    className="mt-2 text-black block mr-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6">
                                    {t("auth.lastName")}
                                </label>
                                <input
                                    required
                                    minLength={3}
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    value={lastName}
                                    onChange={({target} : InputTarget) => setLastName(target.value)}
                                    className="mt-2 text-black block mr-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6">
                                {t("auth.email")}
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={({target} : InputTarget) => setEmail(target.value)}
                                    className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6">
                                {t("auth.password")}
                            </label>
                            <div className="mt-2">
                                <input
                                    required
                                    minLength={3}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={({target} : InputTarget) => setPassword(target.value)}
                                    className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {
                            error && error.length > 0 &&
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        }

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {t("auth.signup")}
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <GoogleLogin onGoogleSignIn={(cred) => onGoogleSignIn(cred, setLoggedIn)} text="Sign up with Google" />
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        {t("auth.registeredAlready")}{' '}
                        <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            {t("auth.signin")}
                        </a>
                    </p>
                </div>
            </div>
            <DarkModeSwitch />
            <div className="mt-3 flex justify-center">
                <LanguageSwitcher />
            </div>
        </div>
    );
}